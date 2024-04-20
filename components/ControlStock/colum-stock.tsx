"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

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
import { removeProducById,removeSelected } from '@/redux/features/productosSlice'
import AddProducto from "@/components/ControlStock/addprodcuto"
import Link from "next/link"
import UpdateProducto from "@/components/ControlStock/updateproduct"
import { toast } from "@/components/ui/use-toast"
import { env } from "process"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Payment = {
  id: number
  precio: number
  nombre: string
  stock: number
  categoria: string
}



export const columnStock: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
 
      return <div className="text-center font-medium">$ {amount.toLocaleString()}</div>
    },
  },
  /* Accion para eliminar varios Elementos */
  {
    accessorKey: "accion",
    header: ({table}) => {
      /* const dispatch = useAppDispatch(); */
      
      const deleteItems = async () =>{
        let selected = table.getSelectedRowModel().rows.map((e)=> e.original);
       
        if(selected.length <= 1) return toast({variant:"destructive",title:"Selececione mas de uno o elimine individualmente"})

        selected.map(async e =>{
          await fetch(`http://localhost:3000/api/producto/${e.id}`,{method: 'DELETE'});
        })

        /* dispatch(removeSelected(selected)); */
        table.toggleAllPageRowsSelected(false)
        toast({variant:"destructive",title:"Se eliminaron correctamente"});
      }
      return (table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()) ?
      <div className="flex justify-end"><Button onClick={()=> deleteItems()} size={"sm"} className="bg-destructive"><Trash2 size={20} strokeWidth={1.50} /></Button></div> : <div className="text-right">Acciones</div> 
    },
    id: "actions",
    cell: ({ row, table }) => {
      
      /* const dispatch = useAppDispatch(); */
      const payment = row.original
      /* Accion para eliminar un Elemento */
      const deleteItems = async () =>{

        await (await fetch(`http://localhost:3000/api/producto/${payment.id}`,{method: 'DELETE'})).json();
        
        /* dispatch(removeProducById(payment.id)); */
        
        toast({variant:"destructive",title:`${payment.nombre} Se elimino correctamente`})


      }


      return (
        <div className="text-right">
        <DropdownMenu onOpenChange={() => false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

              
            <DropdownMenuContent align="end">              
              <DropdownMenuLabel >Acciones</DropdownMenuLabel>
              {
                (table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected())? <p className="text-sm text-center">Ninguna</p> :
                  <><DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id.toString())}
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <UpdateProducto id={payment.id} categoria={payment.categoria}></UpdateProducto>
                <DropdownMenuItem className="text-destructive" onClick={(e) => deleteItems()}>Eliminar</DropdownMenuItem>
                </>
              }
            
            </DropdownMenuContent>
          </DropdownMenu>     
        </div>
      )
    },
  },
]
