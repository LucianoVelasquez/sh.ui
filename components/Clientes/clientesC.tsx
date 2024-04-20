"use client"
import { useAppSelector } from "@/redux/hooks";
import {columnsClientes} from '@/components/Clientes/columns-clientes'
import { TablaDataClientes } from "@/components/Clientes/tabla-data-clientes"

export default function Clientes(){
  const clientes = useAppSelector((state) => state.productosReducer.clientes);
  
  return(
    <>
      <h1 className="text-4xl mt-5 ">Control de Clientes</h1>

      <div className="bg-background min-h-96 w-11/12 rounded-md shadow-md mb-6">
        
        <TablaDataClientes columns={columnsClientes} data={clientes}></TablaDataClientes>
      </div> 
    </>
  )
}