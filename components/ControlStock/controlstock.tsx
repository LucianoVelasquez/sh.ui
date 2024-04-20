'use client'
import { useAppSelector } from "@/redux/hooks";
import { columnStock } from "@/components/ControlStock/colum-stock";
import { DataTable } from "@/components/ControlStock/data-table";
import { Input } from "@/components/ui/input";
import AddProducto from "@/components/ControlStock/addprodcuto";
import { useDispatch } from "react-redux";
import { addAllProducts } from "@/redux/features/productosSlice";
import { useEffect } from "react";
import { env } from "process";

export default function Stock(){
  
  const dispatch = useDispatch();
  const productos = useAppSelector((state) => state.productosReducer.productos );

  const loadInfo = async () =>{
    const data = await (await fetch('http://localhost:3000/api/producto',{ method: 'GET' })).json();
    dispatch(addAllProducts(data));
  
  } 

  useEffect(()=>{
    loadInfo()
  },[productos])


  return(
    <section className="flex flex-col ml-1 justify-start items-center bg-primary-foreground  w-full min-h-svh gap-8 rounded-md shadow-lg">

      <h1 className="text-4xl mt-5 ">Control de Stock</h1>

      <div className="bg-background min-h-96 w-11/12 rounded-md shadow-md mb-6">
        
        <DataTable columns={columnStock} data={productos}></DataTable>
      </div>

    </section>
  )
}