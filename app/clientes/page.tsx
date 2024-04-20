import Clientes from "@/components/Clientes/clientesC";

export default function Page(){
  return(
    <section className="flex flex-col ml-1 justify-start items-center bg-primary-foreground  w-full min-h-svh gap-8 rounded-md shadow-lg">
      <Clientes></Clientes>
    </section>
  )
  
}