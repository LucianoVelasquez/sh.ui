import Image from "next/image"
import img from "@/public/phone.svg"
import { Button } from "../ui/button"
import Link from "next/link"
import { Linkedin,Github,BriefcaseBusiness   } from 'lucide-react';

export default function NoResposive(){
  return(
    <section className="w-full">
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      {/* <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> */}
      <Image src={img} width={720} height={600} className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero"></Image>

      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-foreground text-wrap"> Actualmente, nuestro sitio web está en proceso de optimización para dispositivos móviles.</h1>
        <p className="mb-8 leading-relaxed text-foreground opacity-75">Si deseas conocer más sobre mis proyectos y explorar ejemplos de otros trabajo, te invito a visitar los siguientes enlaces</p>
        <div className="flex justify-center gap-x-5">
        <Link target="_blank" href={"https://www.linkedin.com/in/lv-dev/"}><Linkedin>Linkeind</Linkedin></Link>
        <Link target="_blank" href={"https://github.com/LucianoVelasquez"}><Github >Portafolio</Github></Link>
        <Link target="_blank" href={"https://veldev.vercel.app/"}><BriefcaseBusiness >Git Hub</BriefcaseBusiness></Link>
        </div>
      </div>
    </div>

  </section>
  )
}