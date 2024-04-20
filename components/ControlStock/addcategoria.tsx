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
import { useAppSelector } from "@/redux/hooks";
import { updateCategoria } from "@/redux/features/productosSlice";
import { Cross2Icon } from "@radix-ui/react-icons";
import { env } from "process";


export default function AddButtonCategoria(){
  const { toast } = useToast()
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)
  const [data,setData] = useState(
    {
      nombre: "",
    }
  );


  const validation = () =>{
    return data.nombre == ""
  }

  /* Funcion para agregar nuevos elementos */
  const sendData = async () =>{

    if(validation()) return toast({variant:"destructive",title:"Rellena correctamente los campos"});
    
    

    const newPost = await (await fetch(env.API_URL+'/api/producto/categoria',{method: 'POST',body: JSON.stringify(data)})).json();

    
    if(newPost.message.includes("La categoria ya existe")) return toast({variant:"destructive",title:"La categoria ya existe"});

    toast({title:`${data.nombre} se agrego con exito`})
    dispatch(updateCategoria(newPost.body))
    
     setData({
      nombre: ""
    }) 
    
    setOpen(!open)
  }

  return(
    <div className="absolute right-8 ">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button className=""  variant="outline" onClick={() => setOpen(!open)}>Nueva</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer">
              <Cross2Icon onClick={()=> setOpen(!open)} className="h-4 w-4" />
            </div>
          <DialogHeader>
            <DialogTitle>Agregar nueva Categoria</DialogTitle>
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
          </div>
          <DialogFooter>
            <Button onClick={ ()=> sendData() }>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}