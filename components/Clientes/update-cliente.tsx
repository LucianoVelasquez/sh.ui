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
import { updateCliente } from "@/redux/features/productosSlice";
import { Cross2Icon } from "@radix-ui/react-icons";
import { env } from "process";
import { useAppSelector } from "@/redux/hooks";


export default function UpdateCliente({ id,cantidad,nombre } : any){
  const { toast } = useToast()
  const dispatch = useDispatch();
  const [deudaTotal,setDeudaTotal] = useState<number>(cantidad)
  const [open,setOpen] = useState(false)
  const ApiUrl = useAppSelector((state) => state.productosReducer.url);
  const validation = (e:any) =>{
    if(e.target.value < 0 || e.target.value > cantidad) return
    setDeudaTotal(e.target.value)
  }

  /* Funcion para agregar nuevos elementos */
  const sendData = async () =>{

    if(deudaTotal == 0) return toast({variant:"destructive",title:"No se puede pagar $0"})
    dispatch(updateCliente({nombre,deudaTotal}))

    const newUpdate = await (await fetch(`${ApiUrl}/api/clientes/`,{method: "PUT", body: JSON.stringify({id,deudaTotal,nombre})})).json()
    
    toast({title:`${nombre} pago en efectivo $${deudaTotal.toLocaleString()}`})
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
            <DialogTitle></DialogTitle>
            <DialogDescription className="flex items-center justify-center">
              <h1 className="text-3xl mt-3">{nombre} debe ${deudaTotal.toLocaleString()}</h1>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/*Campo precio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Cantidad $
              </Label>
              <Input id="precio" value={deudaTotal} type="number" onChange={(e) => validation(e)}  className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={ ()=> sendData() }>Cobrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}