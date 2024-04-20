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
import { Trash2 } from "lucide-react";
import { deleteClienteL } from "@/redux/features/productosSlice";
import { Cross2Icon } from "@radix-ui/react-icons";
import { env } from "process";


export default function DeleteCliente({ id,cantidad,nombre } : any){
  const { toast } = useToast()
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)


  /* Funcion para eliminar elementos */
  const sendData = async () =>{

    dispatch(deleteClienteL({nombre}))

    const newUpdate = await (await fetch("http://localhost:3000/api/clientes",{method: "DELETE", body: JSON.stringify({nombre})})).json()
   
    toast({title:`El cliente ${nombre} se elimino con exito`})
    setOpen(!open)
  }

  return(
    <div className="">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(!open)} className="p-1" variant={"outline"}><Trash2 id={id} color="#e62828" size={19}/></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ">
              <Cross2Icon onClick={()=> setOpen(!open)} className="h-4 w-4" />
            </div>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription className="flex items-center justify-center">
              <h1 className="text-2xl mt-3">Desea eliminar a {nombre}?</h1>
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex justify-center items-center">
            <Button variant={"destructive"} onClick={ ()=> sendData() }>Eliminar</Button>
            <Button onClick={ ()=> setOpen(!open) }>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}