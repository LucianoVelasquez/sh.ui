"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown,PlusSquare, Trash2  } from "lucide-react"
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
import { addVentas, productoI } from '@/redux/features/productosSlice'
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import UpdateCliente from "./update-cliente";
import DeleteCliente from "@/components/Clientes/deletecliente"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Payment = {
  id: number
  deudaTotal: number
  nombre: string
}



export const columnsClientes: ColumnDef<Payment>[] = [
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
    header: "Nombre",
  },
  {
    accessorKey: "deudaTotal",
    header: ({ column }) => {
      return (
        <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deuda total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("deudaTotal"));
      return <div className="text-center font-medium">$ {amount.toLocaleString()}</div>
    },
  },
  /* Accion para los Elementos */
  {
    accessorKey: "accion",
    header: ({table}) => {
      return <div className="text-right">Acciones</div> 
    },
    id: "actions",
    cell: ({ row, table }) => {

      return (
        <div className="text-right flex justify-end items-center gap-x-2">
          
          <UpdateCliente nombre={row.getValue("nombre")} cantidad={row.getValue("deudaTotal")} id={row.getValue("id")}></UpdateCliente>
          <DeleteCliente nombre={row.getValue("nombre")}></DeleteCliente>    
        </div>
      )
    },
  },
]
