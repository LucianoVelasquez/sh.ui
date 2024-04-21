import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import UpdateCliente from "@/components/Clientes/update-cliente"
import UserUpdate from "@/components/Home/userupdate"

interface Carta{
  title?: string
  imagen?: any
  sizew?: number
  sizeh?: number
  url?: string
}

export default function ViewCard({title,imagen,sizew = 72,sizeh =  40,url = '/'} : Carta) {
  return (
    <Link href={url!}>
      <Card className="hover:bg-accent text-accent-foreground transition-all duration-700 ease-in-out w-[200px]  1lg:w-[250px] 2lg:w-[337px]">
        <CardHeader className="pb-3">
          <span>{title}</span>
        </CardHeader>
        <CardFooter>
        <Image className={`h-${sizeh} w-${sizew} object-fill `} alt="algo" src={imagen!} >
        </Image> 
        </CardFooter>
{/*         <Image className={`h-40 w-72 object-fill `} alt="algo" src={imagen!} ></Image> 
 */}      </Card>
    </Link>
  )
}
