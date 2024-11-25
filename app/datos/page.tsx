import Image from "next/image";
import construction from "@/public/Constructions.svg"

export default function Page(){
  return(
    <section className="flex flex-col ml-1 justify-start items-center bg-muted  w-full min-h-svh gap-8 rounded-md shadow-lg">
      <div className="bg-background  min-h-96 w-11/12 rounded-md shadow-md mt-[100px] flex text-center items-center justify-center">
        
        <div className="h-full w-1/3">
          <Image className="object-fill"  alt="construction" src={construction}></Image>
        </div>

      </div> 
    </section>
  )
  
}