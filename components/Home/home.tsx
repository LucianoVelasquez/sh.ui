'use client'
import { useAppSelector } from "@/redux/hooks"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ViewCard from "@/components/Home/viewcard";
import imagen from '@/public/production.svg'
import anality2 from '@/public/anality2.svg'
import userimg from '@/public/user-status.svg'
import tra from '@/public/transaction.svg'
import setting from '@/public/settings.svg'
import qr from '@/public/qr-code.png'
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";


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
      title: "Ir a Estadisticas",
      imagen: anality2,

      url: "/dashboard"
    },

  ]

  return(
    <div className="ml-1 flex justify-center items-center bg-primary-foreground w-full ">
       <div className="relative w-11/12 bg-b bg-background text-foreground rounded-md shadow-md mr-8">
        <Button variant={"outline"} className="absolute right-10 top-12" size={"sm"}><p className="text-sm">{fechaDeHoy.getDate()}/{fechaDeHoy.getMonth()+1}/{fechaDeHoy.getFullYear()}</p></Button>
        <h3 className="mt-10 ml-10 mb-10 text-5xl">{user.username? `Bienvenido ${user.username}` : "Cargando ..."}</h3>
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
             <TooltipProvider>
               <Tooltip >
                 <TooltipTrigger asChild>
                   <Link
                    target="_blank"
                     href="https://veldev.vercel.app/"
                   >
                     <div className="flex border h-60 w-80 rounded-md justify-center hover:bg-accent text-accent-foreground transition-all duration-700 ease-in-out p-2">
                     <Image className="object-cover h-56 w-56" alt={"qr"} src={qr}></Image>
                     </div>
                   </Link>
                 </TooltipTrigger>
                 <TooltipContent side="top">Conoce mas sobre mi</TooltipContent>
               </Tooltip>
             </TooltipProvider>  
             <ViewCard title="Opciones" url="/clientes/update"  imagen={setting}/>
           </div> 
       </section>
          )
        }
           
      </div>
    </div>
  )
}