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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { addClientes } from "@/redux/features/productosSlice";
import { env } from "process";
import { Cross2Icon } from "@radix-ui/react-icons";


export default function AddButtonCliente(){
  const { toast } = useToast()
  const userActivo = useAppSelector((state) => state.productosReducer.user);
  const ApiUrl = useAppSelector((state) => state.productosReducer.url);
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)
  const [data,setData] = useState(
    {
      nombre: "",
      userId: userActivo.id
    }
  );
  
  const validation = () =>{
    return data.nombre == ""
  }

  /* Funcion para agregar nuevos elementos */
  const sendData = async () =>{

    if(validation()) return toast({variant:"destructive",title:"Rellena correctamente los campos"});
    
    toast({title:`${data.nombre} se agrego con exito`})

    const newPost = await (await fetch(`${ApiUrl}api/clientes`,{method: 'POST',body: JSON.stringify(data)})).json();

    
    dispatch(addClientes(newPost.body))
    
     setData({
      nombre: "",
      userId: userActivo.id
    }) 
    
    setOpen(!open)
  }

  return(
    <div className="absolute right-8">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(!open)}>Agregar nuevo cliente</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer hover:bg-accent">
              <Cross2Icon onClick={()=> setOpen(!open)} className="h-4 w-4" />
            </div>
          <DialogHeader>
            <DialogTitle>Agregar nuevo cliente</DialogTitle>
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