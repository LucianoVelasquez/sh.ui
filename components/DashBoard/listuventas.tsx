import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ListVentas({ultimasVentas} : any) {
  console.log(ultimasVentas)
  return (
    <Card className="w-[390]">
      <CardHeader className="">
        <CardTitle>Ventas</CardTitle>
        <CardDescription>Ultimas 10 ventas realizadas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="p-0">
          <TableHeader className="p-0">
            <TableRow>
              <TableHead >Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Estado de venta</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
          {
              ultimasVentas ? ultimasVentas.newFiltro?.map((item :any) =>{
                return (
                  <TableRow className="" key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.cliente? item.cliente.nombre : "Anonimo"}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs text-nowrap" variant="secondary">
                        {item.pago_pendiente? "Pendiente de pago": "Pago"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-nowrap">{item.createdAt.substring(0, 10)}</TableCell>
                    <TableCell className="text-right">${item.precioTotal.toLocaleString()}</TableCell>
                  </TableRow>
                )
              }) : <h1 className="text-center m-5"> Cargando ...</h1>
             }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
