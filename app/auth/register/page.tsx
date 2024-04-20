"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { env } from "process"
import { useAppSelector } from "@/redux/hooks"

export interface FormData{
  username: string
  email: string
  password: string
  confirmarpassword?: string
}

export default function Page() {

  const { register,handleSubmit, formState : {errors},setError } = useForm<FormData>();
  const router = useRouter()
  const ApiUrl = useAppSelector((state) => state.productosReducer.url);
  const sendData = handleSubmit(async (data) => {
    const regex = /^[a-zA-Z0-9._@-]+$/;

    if(data.password != data.confirmarpassword) return toast({variant:"destructive",title:"Las passwords no coinciden"});

    if(!regex.test(data.email) || !data.email.includes("@") ) return toast({variant:"destructive",title:"Email incorrecto"});
  
    const res = await fetch(`${ApiUrl}/api/auth/register`,{method: "POST",body: JSON.stringify(data),headers:{
      'Content-Type': 'application/json'
    }
    })

    const resJson = await res.json();

    if(resJson.mesage && resJson.mesage.includes("Ya existe el usuario")) return toast({variant:"destructive",title:"El usuario ya existe"}) 
    
    //Implementar la ruta que te lleve al login
    router.push("/auth/login")
  })

  return (
    <div className="flex justify-center items-center min-h-screen">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registrar</CardTitle>
        <CardDescription>
          Ingesa tu informacion para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Nombre</Label>
              <Input placeholder="Juan" {...register("username",{required: {value:true, message:"Este campo es requerido"},})} id="first-name" />
              { errors.username &&  <span className="text-xs text-red-500">{errors.username.message}</span>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register("email",{required: {value:true, message:"Este campo es requerido"}})}
            />
            { errors.email &&  <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input placeholder="********" {...register("password",{required: {value:true, message:"Este campo es requerido"},minLength: {value: 8, message:"Debe ser una combinacion mayor a 8 digitos"}})} id="password" type="password" />
            { errors.password &&  <span className="text-xs text-red-500">{errors.password.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmarpassword">Confirmar Password</Label>
            <Input placeholder="********" {...register("confirmarpassword",{required: {value:true, message:"Este campo es requerido"}})} id="confirmarpassword" type="password" />
            { errors.confirmarpassword &&  <span className="text-xs text-red-500">{errors.confirmarpassword.message}</span>}
          </div>
          <Button onClick={()=> sendData()} className="w-full">
            Crear cuenta
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="underline">
            Iniciar sesión
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
