'use client'

import Menu from "@/components/Menu/menu";
import Ventas from "@/components/Ventas/ventasC"
import { clearVentas } from "@/redux/features/productosSlice";
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Page(){
  const dispatch = useDispatch();

  useEffect((): any =>{

    return () => {
      dispatch(clearVentas()) 
    };

  },[])
  
  return(
      <Ventas />
  )
}