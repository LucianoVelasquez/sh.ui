'use client'
import Image from "next/image"
import Link from "next/link"
import imagen from "@/public/finance.svg"


import { useDispatch } from "react-redux"
import { setLogin } from "@/redux/features/productosSlice"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { toast } from "@/components/ui/use-toast"
import ModeToggle from "@/components/themecontrollers/themecontroller"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import NoResposive from "@/components/Noresposive/noresposive"



interface FormLogin{
  email:string
  password:string
}

export default function Page() {
  const router = useRouter();
  const {register,formState : {errors},handleSubmit} = useForm<FormLogin>()
  const [isMovil,setIsMovil] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{

    /* Revisar esto */
    if(window.innerWidth < 924){
      setIsMovil(true)
    }
  },[])


  const sendLogin = handleSubmit( async (data) => {
    const res = await signIn('credentials',{
      email: data.email,
      password: data.password,
      redirect: false
    })
    
    if(res!.error) return toast({variant:"destructive",title:res?.error})
    
    
    toast({variant:"default",title:`Sesion exitosa`})
    
    router.push("/");
  })

  const testTeo =  async () => {
    const res = await signIn('credentials',{
      email: "vel166@gmail.com",
      password: "40166509",
      redirect: false
    })
    
    if(res!.error) return toast({variant:"destructive",title:res?.error})
    
    /* dispatch(setLogin(true)) */
    toast({variant:"default",title:`Sesion de prueba`})
    
    router.push("/");
  }

  return (
    <>
    {
    !isMovil?
    <div className="relative w-full lg:grid h-screen lg:grid-cols-2 ">
      <div className="absolute left-6 top-3" ><ModeToggle/></div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <p className="text-balance text-muted-foreground">
            Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email",{required:{value:true, message:"Rellena correctamente el campo"}})}
              />
              { errors.email &&  <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input placeholder="********" {...register("password",{required:{value:true,message:"Este campo es obligatorio"}})} id="password" type="password" required />
              { errors.password &&  <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>
            <Button onClick={()=> sendLogin()} type="submit" className="w-full text-background dark:text-foreground hover:text-foreground">
              Iniciar sesión
            </Button>
            <Button onClick={()=> testTeo()} type="submit" className="w-full bg-green-700 text-background dark:text-foreground hover:text-foreground">
              Usuario de Prueba
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            No tienes cuenta?{" "}
            <Link href="/auth/register" className="underline">
              Registrar
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block ">
        <Image
          src="/Order.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover "
        />
      </div>
    </div>
    :
    <NoResposive></NoResposive>
    }
    </>
  )
}
