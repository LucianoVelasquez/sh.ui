'use client'
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
import { addClientes } from "@/redux/features/productosSlice";
import { Cross2Icon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

 interface FormData{
  username: string
  password: string
}


export default function UserUpdate(){
  const { toast } = useToast()
  const userActivo = useAppSelector((state) => state.productosReducer.user);
  const { register,handleSubmit, formState : {errors},setError } = useForm<FormData>();
  const dispatch = useDispatch();
  const router = useRouter()
  const [open,setOpen] = useState(true)
  const [input,setData] = useState(
    {
      nombre: "",
      email: "",
      passowrd: ""
    }
  );
  
  const loadingData = async () =>{

    const user = await (await fetch('http://localhost:3000/api/clientes/1',{ method: 'GET' })).json();
    setData({nombre:user.username,email:user.email,passowrd:""})
  }

  useEffect(()=>{
    loadingData()
  },[userActivo])

  /* Funcion para agregar nuevos elementos */
  const sendData = handleSubmit(async (data) =>{

    const newPost = await (await fetch('http://localhost:3000/api/clientes/1',{method: 'PUT',body: JSON.stringify(data)})).json();

    toast({title:`${data.username} se agrego con exito`})

    

    
     setData({
      nombre: "",
      email: "",
      passowrd: ""
    }) 
    
    setOpen(!open)
    router.push("/")
  })

  const closeView = () =>{
    router.push("/")
  }

  return(
    <div className="">
      <Dialog open={open}>
        <DialogTrigger asChild>
          
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ">
              <Cross2Icon onClick={()=> closeView()} className="h-4 w-4" />
            </div>
          <DialogHeader>
            <DialogTitle>Editar datos del Usuario</DialogTitle>
            <DialogDescription>
              Rellena correctamente todos los campos.
            </DialogDescription>
          </DialogHeader>
          
            {
              userActivo.username.includes("Usuario de Prueba") ?
               <h1 className="text-center text-xl m-5">Disponible solo para usuarios registrados</h1> :<>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Email
                  </Label>
                  <Input id="name" disabled type="email" placeholder={input.email} className="col-span-3 "/>
                </div>

                {/*Campo nombre de producto */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre de usuario
                  </Label>
                  <Input id="name" placeholder={input.nombre} /* onChange={(e) => setData({...data,nombre:e.target.value})} */ className="col-span-3" {...register("username",{required: {value:true, message:"Este campo es requerido"},})}/>
                  { errors.username &&  <span className="text-xs text-center text-red-500">{errors.username.message}</span>}
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input id="password" type="password" placeholder="********"
                  {...register("password",{required: {value:true, message:"Este campo es requerido"},minLength: {value: 8, message:"Debe ser una combinacion mayor a 8 digitos"}})}
                   className="col-span-3"/>
                   { errors.password &&  <span className="text-xs text-center text-red-500">{errors.password.message}</span>}
                </div>
              </div>

              <DialogFooter>
                <Button onClick={ ()=> sendData() }>Guardar Cambios</Button>
              </DialogFooter>
              </>
            }
        </DialogContent>
      </Dialog>
    </div>
  )
}