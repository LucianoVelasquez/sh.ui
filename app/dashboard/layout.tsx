/* import Menu from "@/Components/Menu/menu";
import { NavHeader } from "@/Components/NavHeader/navheader";
import ModeToggle from "@/Components/ThemeController/themecontroller";
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {getServerSession} from 'next-auth/next'


export default async function Layout({ children } : { children : React.ReactNode}){

  const infoData = await getServerSession(authOptions);

  return(
    <div data-theme="business" className=" flex relative">
      <div className="absolute left-32 top-10"><NavHeader/></div>
      <div className="absolute right-5 top-3" ><ModeToggle/></div>
      <Menu infoUser={infoData!.user?.email}></Menu>
      {children}
    </div> 
  )
} */
export default async function Layout({ children } : { children : React.ReactNode}){
  return(
    <div data-theme="business" className=" flex relative">
      {children}
    </div> 
  )
} 