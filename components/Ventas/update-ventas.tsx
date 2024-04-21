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
import { FilePenLine } from "lucide-react";
import { updateVentas } from "@/redux/features/productosSlice";
import { Cross2Icon } from "@radix-ui/react-icons";


export default function UpdateVentas({ id,cantidad } : any){
  const { toast } = useToast()
  const dispatch = useDispatch();
  const [data,setData] = useState(cantidad)
  const [open,setOpen] = useState(false)

  const validation = (e:any) =>{
    if(e.target.value <= 0) return
    setData(e.target.value)
  }

  /* Funcion para agregar nuevos elementos */
  const sendData = () =>{

   dispatch(updateVentas({id,data}))
   setOpen(!open)
  }

  return(
    <div className="">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(!open)} className="p-1" variant={"outline"}><FilePenLine id={id} size={19}/></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer hover:bg-accent">
              <Cross2Icon onClick={()=> setOpen(!open)} className="h-4 w-4" />
            </div>
          <DialogHeader>
            <DialogTitle>Editar Cantidad</DialogTitle>
            <DialogDescription>
              Rellena correctamente todos los campos.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/*Campo precio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Cantidad
              </Label>
              <Input id="precio" value={data} type="number" onChange={(e) => validation(e)}  className="col-span-3"/>
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