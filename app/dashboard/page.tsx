/* 'use client'
import CardD from "@/components/DashBoard/cardD";
import { BarListUsage } from "@/components/DashBoard/barlist";
import ListVentas from "@/components/DashBoard/listuventas"
import { useEffect, useState } from "react";
import { CategoryBarList } from "@/Components/DashBoard/category";
import { BarChart } from '@tremor/react';
import LoadingSpin from "@/Components/Loading/loading";


export default function Page(){
  const [ventasPorCategoria,setVentasPorCategoria] = useState();
  const [ventasPorProducto,setVentasPorProducto] = useState<any>();
  const [ultimasVentas,setUltimasVentas] = useState<any>();
  const [totalSemana,setTotalSemana] = useState<any>();
  const [totalMes,setTotalMes] = useState<any>();
  const [clientes,setClientes] = useState();
  const [loading,setLoading] = useState(true);

  const loadingInfo = async () =>{
    const totalSemana = await (await fetch('http://localhost:3000/api/producto/vendidos/semana/total',{method: "GET"})).json();
    const totalMes = await (await fetch('http://localhost:3000/api/producto/vendidos/mes/total',{method: "GET"})).json();
    setUltimasVentas(await (await fetch('http://localhost:3000/api/producto/vendidos/semana',{method: "GET"})).json());
    setTotalMes(totalMes.body)
    setTotalSemana(totalSemana.body)
    setVentasPorCategoria(await (await fetch('http://localhost:3000/api/producto/categoria',{method: "GET"})).json());
    setVentasPorProducto(await (await fetch('http://localhost:3000/api/producto/vendidos',{method: "GET"})).json());
    setClientes(await (await fetch('http://localhost:3000/api/clientes',{method: "GET"})).json())
    
  }

  useEffect(()=>{
    loadingInfo()
    setTimeout(()=>{
      setLoading(!loading)
    },1500)
  },[])

  const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

  return(
    <section className=" flex ml-1 justify-start items-center bg-primary-foreground w-full min-h-svh rounded-md shadow-lg">
      
      
      <div className="flex flex-col justify-center items-center w-10/12 gap-x-1">

        <div className="flex justify-end items-center gap-x-4  h-auto w-11/12 rounded-md shadow-md ">
          <CardD title={"Esta semana"} totalSemana={totalSemana}></CardD>
          <CardD title={"Este mes"} totalSemana={totalMes}></CardD>
        </div>
        <div className="bg-background h-auto w-11/12 rounded-md shadow-md ">
          <div className="flex rounded-md ">
          
          <CategoryBarList tipoDato={ventasPorCategoria} title={"Productos mas vendidos por categoria"}></CategoryBarList>
          
          <BarListUsage tipoDato={clientes} title={"Clientes que mas deben"}></BarListUsage>
          </div>
          {
            ventasPorProducto? <BarChart
            className="opacity-70"
            data={ventasPorProducto}
            index="name"
            categories={['Vendidos']}
            colors={['rose']}
            valueFormatter={dataFormatter}
            yAxisWidth={62}
            onValueChange={(v) => console.log(v)}
          /> : <h1 className='text-center m-10'>Cargando ...</h1> 
          }
          
        </div>

      </div>

      <div className="flex justify-center items-start h-auto w-auto bg-background mr-5 mb-16 rounded-lg p-1">
        <ListVentas ultimasVentas={ultimasVentas}></ListVentas>
      </div>
      
      </section>
  )
}
 */
export default function Page(){
  return(
    <h1>Nada por aqui</h1>
  )
}