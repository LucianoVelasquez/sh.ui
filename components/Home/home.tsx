'use client'
import { useAppSelector } from "@/redux/hooks"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ViewCard from "@/components/Home/viewcard";
import imagen from '@/public/production.svg'
import anality2 from '@/public/anality2.svg'
import userimg from '@/public/user-status.svg'
import tra from '@/public/transaction.svg'
import dbimg from '@/public/Database.svg'
import setting from '@/public/settings.svg'
import qr from '@/public/qr-code.png'
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"


export default function Home(){
  const user = useAppSelector((state) => state.productosReducer.user);
  const [time,setTime] = useState<boolean>();

  let fechaDeHoy = new Date();

  setTimeout(()=>{
    setTime(true)
  },10)

  let cartas = [
    {
      title: "Ir a Ventas",
      imagen: tra,

      url: "/ventas"
    },
    {
      title: "Ir a Control de Stock",
      imagen: imagen,

      url: "/stock"
    },
    {
      title: "Ir a Cuentas de Clientes",
      imagen: userimg,

      url: "/clientes"
    },
    {
      title: "Ir a Dashboard",
      imagen: anality2,

      url: "/dashboard"
    },

  ]

  return(
    <div className="ml-1 flex justify-center items-center bg-muted w-full ">
       <div className="relative w-11/12 bg-background text-foreground rounded-md shadow-md mr-8 dark:border dark:shadow-2xl">
        <Button variant={"outline"} className="absolute right-10 top-12" size={"sm"}><p className="text-sm">{fechaDeHoy.getDate()}/{fechaDeHoy.getMonth()+1}/{fechaDeHoy.getFullYear()}</p></Button>
        <h3 className="mt-10 ml-10 mb-10 text-5xl">{user.username? `Bienvenido ${user.username}` : "Cargando ..."}</h3>
        <Separator orientation="horizontal" className=" w-11/12 mx-10 mb-5"/>
        {
          time && (
            <section className="flex w-auto justify-center">
            <div className="flex m-1 rounded justify-center flex-wrap gap-y-5 gap-x-6 p-5 w-3/5 mb-10">
              {
               cartas && cartas.map((item) =>{
                 return(
                   <ViewCard key={item.title} title={item.title} imagen={item.imagen} url={item.url}></ViewCard>
                 )
               })
             } 
           </div>
 
           <div className="flex justify-center m-1 rounded gap-y-5 p-5 flex-wrap w-1/3 mb-10">
             <ViewCard key={1} title={"Ir a Base de datos"} imagen={dbimg} url="/datos"></ViewCard>
             <ViewCard title="Opciones" url="/clientes/update"  imagen={setting}/>
           </div> 
       </section>
          )
        }
           
      </div>
    </div>
  )
}