/* "use client"
import { BarList, Card } from '@tremor/react';
import { useState } from 'react';

  
export function BarListUsage({tipoDato,title} : any) {
  let data : any = [];

  tipoDato && tipoDato.map((item : any) => {
    return data.push({name: item.nombre, value: item.deudaTotal.toLocaleString()});
  })

  return (
    <Card className="mx-auto max-w-lg m-2 rounded-md " >
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">{title}</h3>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>{}</span>
        <span>Deuda en $</span>
      </p>
      {
        tipoDato? <BarList data={data} className="mt-2" color="rose" /> : <h1 className='text-center'>Cargando ...</h1>
      }
    </Card>
  );
} */