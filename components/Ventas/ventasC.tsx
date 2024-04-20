import { TablaDataVentas } from "@/components/Ventas/tabla-data-ventas";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { ShoppingCart,Search  } from 'lucide-react';
import { useEffect, useState } from "react";
import { TableView } from "@/components/Ventas/tabla-view-ventas";
import { columnsVentas } from "@/components/Ventas/columns-ventas";
import { addAllProducts } from "@/redux/features/productosSlice";
import { useDispatch } from "react-redux";
import { env } from "process";

export default function Ventas(){
  const productos = useAppSelector((state) => state.productosReducer.productos );
  const [carrito,setCarrito] = useState(false);
  const dispatch = useDispatch();
  
  const loadInfo = async () =>{
    const data = await (await fetch('http://localhost:3000/api/producto',{ method: 'GET' })).json();
    dispatch(addAllProducts(data));
    
  }
  useEffect(()=>{
    loadInfo();
  },[carrito])

  return(
    <section className="flex flex-col ml-1 justify-start items-center bg-primary-foreground  w-full min-h-svh gap-8 rounded-md shadow-lg">

      <h1 className="text-4xl mt-5 ">Gestion de Ventas</h1>
      
      <div className="flex flex-col bg-background min-h-96 w-11/12 rounded-md shadow-md mb-6">
        
        <div className="flex justify-end w-full h-20">
          {carrito? 
            <Button className="mt-10 mr-12 mb-0 text-base" onClick={()=> setCarrito(!carrito)}><Search className="mr-2" size={18}/>Buscar productos</Button> 
          :
            <Button onClick={()=> setCarrito(!carrito)} className="mt-10 mr-12 mb-0 text-base"><ShoppingCart className="mr-1" size={18}/>Carrito</Button>
          }
        </div>

        {carrito? <TableView /> : <TablaDataVentas columns={columnsVentas} data={productos}/>}
      </div>

    </section>
  )
}