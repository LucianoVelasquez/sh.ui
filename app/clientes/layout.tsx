import Menu from "@/components/Menu/menu";
import { NavHeader } from "@/components/NavHeader/navheader";
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth/next'
import ModeToggle from "@/components/themecontrollers/themecontroller";

export default async function Layout({ children } : { children : React.ReactNode}){

  const infoData = await getServerSession(authOptions);
  const ApiUrl = process.env.URL;
  
  return(
    <div data-theme="business" className=" flex relative">
      <div className="absolute left-32 top-10"><NavHeader/></div>
      <div className="absolute right-5 top-3" ><ModeToggle/></div>
      <Menu infoUser={infoData!.user?.email} url={ApiUrl}></Menu>
      {children}
    </div> 
  )
}