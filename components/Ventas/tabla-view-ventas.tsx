import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAppSelector } from "@/redux/hooks"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Trash2,BadgeDollarSign   } from "lucide-react";
import { clearClienteVenta, removeVentas,clearVentas } from "@/redux/features/productosSlice";
import { useDispatch } from "react-redux";
import UpdateVentas from "@/components/Ventas/update-ventas";
import { ComboboxPopover } from "@/components/Ventas/ventacliente";


const invoices = [
  {
    invoice: "Hola",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export function TableView() {
  let productosventas = useAppSelector((state) => state.productosReducer.ventas);
  let userLogin = useAppSelector((state) => state.productosReducer.user)
  let clienteVenta = useAppSelector((state) => state.productosReducer.clienteVenta);
  const dispatch = useDispatch();

  const frontFinalPrecio = () => {
    let precio = 0;
    productosventas.map((item) =>{
      precio += item.cantidadavender!*item.precio;
    })
    return precio;
  }

  const sendData = async () =>{

    if(clienteVenta){

      const newSend = await (await fetch("http://localhost:3000/api/ventas",{method: "POST",body:JSON.stringify({info: productosventas,idCliente: clienteVenta.id,idUser: userLogin.id})})).json(); 
      toast({title:"Venta agregada"});

      dispatch(clearVentas())
      dispatch(clearClienteVenta())
      
    }else{

      const newSend = await (await fetch("http://localhost:3000/api/ventas",{method: "POST",body:JSON.stringify({info: productosventas,idUser: userLogin.id})})).json(); 
      toast({title:"Venta agregada"});

      dispatch(clearVentas())
      dispatch(clearClienteVenta())
    }
  }

  const deleteProduct = (e : any) =>{
    dispatch(removeVentas(parseInt(e.target.id)))
  }
  return (
    <div className="flex flex-col justify-center items-center mt-16 mb-16">
      <div className="rounded-md border  w-11/12 p-2">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Acciones</TableHead>
              <TableHead className="w-[100px] text-left">Producto</TableHead>
              <TableHead className="text-center">Precio por unidad</TableHead>
              <TableHead className="text-center">Cantidad</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {productosventas.map((item) => (
              <TableRow key={item.id} className="text-base">
                <TableCell className="text-left flex">
                  <UpdateVentas id={item.id} cantidad={item.cantidadavender}></UpdateVentas>
                  <Button className="p-1 ml-2" variant={"outline"}><Trash2 onClick={(e)=> deleteProduct(e) } id={`${item.id}`}  color="#e62828" size={19}/></Button>
                </TableCell>
                <TableCell className="font-medium text-left">{item.nombre}</TableCell>
                <TableCell className="text-center">$ {item.precio.toLocaleString()}</TableCell>
                <TableCell className="text-center">{item.cantidadavender}</TableCell>
                <TableCell className="text-right">$ {(item.cantidadavender!*item.precio).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-base">
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right text-lg text-green-700">$ {frontFinalPrecio().toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-end mt-8 mr-28 w-full items-center gap-x-10"> 
        {/* <VentasCliente></VentasCliente> */}
        <ComboboxPopover></ComboboxPopover>
        <Button className="gap-x-1" onClick={()=> sendData()}><BadgeDollarSign size={19}></BadgeDollarSign>Agregar Venta</Button>
      </div>
    </div>
  )
}
