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
import { addProduct,updateProduct } from "@/redux/features/productosSlice";
import {  CheckCheck,LucideDownload } from 'lucide-react';
import LoadingSpin from "@/components/Loading/loading"
import { Cross2Icon } from "@radix-ui/react-icons"
import { InputCategoria } from "@/components/ControlStock/inputcategoria"
import AddButtonCategoria from "@/components/ControlStock/addcategoria"
import { useAppSelector } from "@/redux/hooks"
import { env } from "process"


export default function UpdateProducto({ id,categoria } : {id : number,categoria:string}){
  const { toast } = useToast()
  const dispatch = useDispatch();
  const selectCategoria = useAppSelector((state)=> state.productosReducer.selectCategoria);
  const [data,setData] = useState(
    {
      precio: 0,
      nombre: "",
      stock: 0,
      categoria: ""
    }
  );
  const [key, setKey] = useState(false);
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);

  useEffect(()=>{
    setData({...data,categoria:selectCategoria});
  },[selectCategoria])

 /* Primero se carga la data a los inputs mediante el useState */
  const getData = async () =>{
    setOpen(!open)
    const newData = await (await fetch(`http://localhost:3000/api/producto/${id}`,{method: 'GET'})).json()
    setData({...newData,categoria:categoria})
    setTimeout(()=>{
      setLoading(!loading);
    },170)
  }

  const validation = () =>{
    return data.nombre == "" || data.categoria == ""
  }

  /* Funcion para modificar elemento */
  const sendData = async () =>{

    if(validation()) return toast({variant:"destructive",title:"Rellena correctamente los campos"});
    

    const newPost = await (await fetch(`http://localhost:3000/api/producto/${id}`,{method: 'PUT',body: JSON.stringify(data)})).json();
    

    dispatch(updateProduct({...newPost.message,categoria:data.categoria}))
    toast({title:`${data.nombre} se modifico con exito`})
     setData({
      precio: 0,
      nombre: "",
      stock: 0,
      categoria: ""
    })   

    setKey(!key);
    setTimeout(()=>{
      setOpen(!open)
    },700)
  }

  return(
    <div className="">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={()=> getData()} variant={'ghost'} className="p-2 w-full justify-start cursor-default">Editar</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ">
              <Cross2Icon onClick={()=> setOpen(!open)} className="h-4 w-4" />
          </div>
          <DialogHeader className={`${key == loading? 'hidden' : "visible"}`}>
            <DialogTitle>Editar</DialogTitle>
            <DialogDescription>
              Rellena correctamente todos los campos.
            </DialogDescription>
          </DialogHeader>

          <div className={`grid gap-4 py-4 ${key == loading? 'hidden' : "visible"}`}>
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
              <div className="flex gap-x-28 w-auto">
                <InputCategoria info={categoria}></InputCategoria>
                <AddButtonCategoria></AddButtonCategoria>
              </div>
            </div>
            {/*Campo Stock */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input id="stock" value={data.stock} type="number" onChange={(e) => setData({...data,stock:parseInt(e.target.value)})} className="col-span-3"/>
            </div>
            {/*Campo precio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Precio
              </Label>
              <Input id="precio" value={data.precio} type="number" onChange={(e) => setData({...data,precio:parseInt(e.target.value)})}  className="col-span-3"/>
            </div>
          </div>
          <DialogFooter className={`${key == loading ? 'hidden' : "visible"}`}>
            <Button onClick={ ()=> sendData() }>Guardar Cambios</Button>
          </DialogFooter>

          <div className={`${!loading ? "visible flex justify-center items-center h-80" : "hidden" }`}>
            <LoadingSpin size={26}/>
          </div>

          <div className={`${key ? 'visible flex justify-center items-center h-80' : "hidden"}`}>
            <CheckCheck size={36}/><p className="ml-2 text-xl">Modificado</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}