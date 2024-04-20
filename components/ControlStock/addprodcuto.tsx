"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { addProduct, clearCategoria } from "@/redux/features/productosSlice";
import { useAppSelector } from "@/redux/hooks";
import { InputCategoria } from '@/components/ControlStock/inputcategoria';

import AddButtonCategoria from "@/components/ControlStock/addcategoria";
import { Cross2Icon } from "@radix-ui/react-icons";
import { env } from "process"


export default function AddProducto(){
  const { toast } = useToast()
  const userLogin = useAppSelector((state) => state.productosReducer.user);
  const selectCategoria = useAppSelector((state)=> state.productosReducer.selectCategoria);
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)
  const [data,setData] = useState(
    {
      precio: 0,
      nombre: "",
      stock: 0,
      categoria: ""
    }
  );
  
  const validation = () =>{
    return data.nombre == "" || data.categoria == ""
  }

  useEffect(()=>{
    setData({...data,categoria:selectCategoria});
  },[selectCategoria])

  /* Funcion para agregar nuevos elementos */
  const sendData = async () =>{
    
    if(validation()) return toast({variant:"destructive",title:"Rellena correctamente los campos"});

    
      const newPost = await (await fetch('http://localhost:3000/api/producto',{method: 'POST',body: JSON.stringify({data,userId:userLogin.id})})).json();
    
    
      if(newPost.message.includes("No exite el usuario")) return toast({variant:"destructive",title:"No existe sesion activa"});

      dispatch(addProduct({...data,id:newPost.body.id})) 
    
      
    toast({title:`${data.nombre} se agrego con exito`})

    setData({
      precio: 0,
      nombre: "",
      stock: 0,
      categoria: ""
    })   
    setOpen(!open)
    dispatch(clearCategoria());
  }

  const validationInputNumbers = (e : any) =>{
    if(e.target.id == "stock"){
      if(e.target.value < 0) return setData({...data,stock:0})
        return setData({...data,stock:parseInt(e.target.value)})
    }else{
      if(e.target.value < 0) return setData({...data,precio:0})
      return setData({...data,precio:parseInt(e.target.value)})
    }
  }
  return(
    <div className="absolute right-8">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={()=> setOpen(!open)}>Agregar Producto</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ">
              <Cross2Icon onClick={()=> setOpen(!open)} className="h-4 w-4" />
          </div>
          <DialogHeader>
            <DialogTitle>Agregar Producto</DialogTitle>
            <DialogDescription>
              Rellena correctamente todos los campos.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/*Campo nombre de producto */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" value={data.nombre} onChange={(e) => setData({...data,nombre:e.target.value})} className="col-span-3"/>
            </div>
            {/*Campo categoria */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoria
              </Label>
              {/* <Input id="Categoria" value={data.categoria} onChange={(e) => setData({...data,categoria:e.target.value})} className="col-span-3" /> */}
              <div className="flex gap-x-28 w-auto">
                <InputCategoria></InputCategoria>
                <AddButtonCategoria></AddButtonCategoria>
              </div>
            </div>
            {/*Campo Stock */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input id="stock" value={data.stock} type="number" onChange={(e) => validationInputNumbers(e)} className="col-span-3"/>
            </div>
            {/*Campo precio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Precio
              </Label>
              <Input id="precio" value={data.precio} type="number" onChange={(e) => validationInputNumbers(e)}  className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={ ()=> sendData() }>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}