
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import Menu from '@/components/Menu/menu';
import Home from '@/components/Home/home';
import ModeToggle from '@/components/themecontrollers/themecontroller';

export default async function Page() {
  
  const infoData = await getServerSession(authOptions);
  
  const ApiUrl = process.env.URL;
  console.log(ApiUrl);
  return (
      <div data-theme="business" className="flex relative bg-background rounded-md shadow-lg">
        <div className="absolute right-5 top-3" ><ModeToggle/></div>
        <Menu infoUser={infoData!.user!.email} url={ApiUrl}></Menu>
        <Home></Home>
        
      </div>
  );
}
