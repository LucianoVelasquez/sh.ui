'use client'
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addAllProducts, setLogin,closedSession, loadingClientes,loadingCategorias, addUrl } from '@/redux/features/productosSlice'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from 'next-auth/react'
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
  LogOut ,
  Database 
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import icon from "@/public/qr-code.png"


export default function Menu({ infoUser,url }:any) {
  const dispatch = useDispatch();
  const menuIcon = usePathname();
  
  const ApiUrl = url;
  
  const loadInfo = async () =>{
    const data = await (await fetch(`${ApiUrl}api/producto`,{ method: 'GET' })).json();
    const clientes = await (await fetch(`${ApiUrl}api/clientes`,{ method: 'GET' })).json();
    const categorias = await (await fetch(`${ApiUrl}api/producto/categoria/todas`,{ method: 'GET' })).json();

    if(infoUser != undefined){
      const user = await (await fetch(`${ApiUrl}api/auth/register/users/${infoUser}`,{method: "GET"})).json();
      dispatch(setLogin(user.body));
    }
    
    dispatch(loadingClientes(clientes))
    dispatch(addAllProducts(data));
    dispatch(loadingCategorias(categorias.body))
    dispatch(addUrl(ApiUrl))
  }

  useEffect(()=>{
    
    loadInfo();

  },[])

  const closeS = () =>{
    dispatch(closedSession());
    signOut()
  }

  return (
    

      <div className="flex min-h-screen min-w-14 flex-col bg-muted/40">
        <aside className="min-h-full inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex text-base rounded-md">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <Link
              target="_blank"
              href="https://veldev.vercel.app/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary-foreground text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
              <Image className="h-8 w-8" alt="icon" src={icon}></Image>
              <span className="sr-only">Icon veldev</span>
            </Link>
          <TooltipProvider>
            <Tooltip >
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg  ${menuIcon == "/"?"bg-accent text-accent-foreground": "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Inicio</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Inicio</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  
                  href="/ventas"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg  ${menuIcon == "/ventas"?"bg-accent text-accent-foreground": "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <ShoppingCart  className="h-5 w-5" />
                  <span className="sr-only">Vender</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Vender</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  
                  href="/stock"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg  ${menuIcon == "/stock"?"bg-accent text-accent-foreground": "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Productos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Productos</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/clientes"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg  ${menuIcon == "/clientes"?"bg-accent text-accent-foreground": "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Users2  className="h-5 w-5" />
                  <span className="sr-only">Clientes</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Clientes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/datos"
                  
                  className={`flex h-9 w-9 items-center justify-center rounded-lg  ${menuIcon == "/datos"?"bg-accent text-accent-foreground": "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <Database className="h-5 w-5" />
                  <span className="sr-only">Base de datos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Base de datos</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  
                  className={`flex h-9 w-9 items-center justify-center rounded-lg  ${menuIcon == "/dashboard"?"bg-accent text-accent-foreground": "text-muted-foreground"} transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/clientes/update"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="mb-8" asChild>
                <Link
                  href=""
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={()=> closeS()}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Cerrar</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Cerrar</TooltipContent>
            </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
      </div>
   
  );
}
/* Old Meni */
/* 
<section className="flex flex-col bg-primary-foreground m-1 rounded-md shadow-lg min-w-60 h-svh">
<div className="flex justify-center items-center gap-4 mt-8 rounded-sm m-1">
        <Avatar>
          <AvatarImage src="https://www.svgrepo.com/show/530443/interface-control.svg"></AvatarImage>
          <AvatarFallback>Algo</AvatarFallback>
        </Avatar>
        <p className="text-xl">Gestor de ventas</p>
      </div>

      <div className="mt-20 ">
        <ul className="flex flex-col gap-5 items-center p-2">
          <li className="w-full"><Link  href={'http://localhost:3000'}><Button variant={"ghost"} className="w-full text-base" size={'lg'}>Home</Button></Link></li>
          {path == "/ventas" ? " " :<li className="w-full" ><Link href={'http://localhost:3000/ventas'}><Button variant={"ghost"} className="w-full text-base"  size={"lg"}>Gestion de Ventas</Button></Link></li>}
          {path == "/stock" ? " " : <li className="w-full" ><Link href={'http://localhost:3000/stock'}><Button variant={"ghost"} className="w-full text-base"  size={"lg"}>Control Stock</Button></Link></li>}
        </ul>
      </div>
      <div className="absolute bottom-16 left-14">
        <Button onClick={()=> closeS()}>Cerrar Sesion</Button>
      </div>
       </section>
 */