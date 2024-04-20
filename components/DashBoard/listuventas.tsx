/* import { Badge } from "@/Components/ui/Badge/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/Card/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/Table/table"

export default function ListVentas({ultimasVentas} : any) {
  
  return (
    <Card className="w-[490px]">
      <CardHeader className="px-7">
        <CardTitle>Ventas</CardTitle>
        <CardDescription>Ultimas 10 ventas realizadas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader className="">
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
                  <TableRow className="" key={item.cliente.nombre}>
                    <TableCell>
                      <div className="font-medium">{item.cliente? item.cliente.nombre : "Anonimo"}</div>
                      
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {item.pago_pendiente? "Pendiente de pago": "Pago"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{item.createdAt.substring(0, 10)}</TableCell>
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
 */