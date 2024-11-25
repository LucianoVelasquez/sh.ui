"use client"
import { BarList, Card } from '@tremor/react';
import { useState } from 'react';

  
export function CategoryBarList({tipoDato,title} : any) {
  
  return (
    <Card className="mx-auto max-w-lg m-2 rounded-md " >
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">{title}</h3>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>{}</span>
        <span>Cantidad</span>
      </p>
      {
        tipoDato? <BarList data={tipoDato} className="mt-2" color="blue" /> : <h1 className='text-center'>Cargando ...</h1>
      }
    </Card>
  );
}