"use client"
import { useAppSelector } from "@/redux/hooks";
import {columnsClientes} from '@/components/Clientes/columns-clientes'
import { TablaDataClientes } from "@/components/Clientes/tabla-data-clientes"

export default function Clientes(){
  const clientes = useAppSelector((state) => state.productosReducer.clientes);
  
  return(
    <>
      

      <div className="bg-background  min-h-96 w-11/12 rounded-md shadow-md mt-[80px]">
        
        <TablaDataClientes columns={columnsClientes} data={clientes}></TablaDataClientes>
      </div> 
    </>
  )
}