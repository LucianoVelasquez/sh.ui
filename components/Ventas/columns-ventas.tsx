"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown,PlusSquare  } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {prisma} from '@/lib/prisma'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/redux/hooks"
import { addVentas, productoI, updateProduct } from '@/redux/features/productosSlice'
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Payment = {
  id: number
  precio: number
  nombre: string
  stock: number
  categoria: string
  cantidadavender: number
}



export const columnsVentas: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) =>{
      return(
        <div className="text-left">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) =>{
      return <div className="text-left ml-4">{row.getValue("id")}</div>
    
    }
  },
  {
    accessorKey: "nombre",
    header: "Producto",
  },
  {
    accessorKey: "categoria",
    header: "Categoria"
  },
  {
    accessorKey: "stock",
    header: ({ column }) =>{
      return(
        <p className="text-center" >Stock</p>
      )
    },
    cell: ({ row }) =>{
      return <p className={`text-center ${parseInt(row.getValue("stock")) == 0 ? "text-red-600" : ""}`}>{row.getValue("stock")}</p>
    }
  },
  {
    accessorKey: "precio",
    header: ({ column }) => {
      return (
        <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio Unitario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("precio"));
      /* const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount) */
 
      return <div className={`text-center font-medium `}>$ {amount.toLocaleString()}</div>
    },
  },
  /* Accion para eliminar varios Elementos */
  {
    accessorKey: "accion",
    header: ({table}) => {
      

      return <div className="text-right">Acciones</div> 
    },
    id: "actions",
    cell: ({ row, table }) => {
      //@ts-ignore
      const dispatch = useAppDispatch();
      const [cantidad,setCantidad] = useState<number>(0);
      const [newData,setNewData] = useState<any>()
      
      /* manejador evento de cambio */
      const addItem =  (e:any) => {
        
        setCantidad(e.target.value)
        setNewData({...row.original, cantidadavender: parseInt(e.target.value)})
        
      }
      /* Enviar data al estado */
      const sendData = async () =>{
        if(cantidad == 0 ) return toast({variant:"destructive",title:`No se pueden agregar 0 cantidades de ${row.original.nombre}`})
        if(cantidad > parseInt(row.getValue("stock"))) return toast({variant:"destructive",title:"No se pueden agregar mas del stock actual."})

        toast({title:`Se agregaron ${cantidad} ${row.original.nombre}`})
       
        dispatch(addVentas(newData));
        setCantidad(0); 
        
      }

      const validation = () => {
        if(cantidad < 0) return 0;

        if(cantidad > parseInt(row.getValue("stock"))) return parseInt(row.getValue("stock"));

        return cantidad;
      }


      return (
        <div className="text-right flex justify-end items-center gap-x-2">
          
          <Input value={validation()} onChange={(e) => addItem(e)} className="w-16" type="number"></Input>

          <PlusSquare onClick={() => sendData()
          } className="hover:-translate-y-0.5" size={26}>Agregar</PlusSquare>     
        </div>
      )
    },
  },
]
