import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    
    const data = await request.json();
    

    let preciototal = 0;

    //Calculamos el precio final.
    data.info.map((item: any) =>{
      preciototal += item.cantidadavender*item.precio;
    })

    let newVenta;
    //Creamos la venta
    if(data.idCliente){
       newVenta = await prisma.ventas.create({
        data:{
          precioTotal: preciototal,
          clienteId: data.idCliente,
          pago_pendiente: true,
          userId: data.idUser
        }
      })

      const findUser = await prisma.cliente.findFirst({where :{id:data.idCliente}});

      const updateCLient = await prisma.cliente.update({where: {id: data.idCliente},data:{
        deudaTotal: findUser!.deudaTotal + preciototal
      }})

    }else{
      
       newVenta = await prisma.ventas.create({
        data:{
          precioTotal: preciototal,
          userId: data.idUser
        }
      })

    }

    
    //Realizamos la relacion con los productos.
    data.info.map(async (item : any) => {

      const producto = await prisma.producto.findFirst({where: {id:item.id}});

      await prisma.producto.update({
        where:{id: parseInt(item.id)},
        data:{
          ventas:{
            connect: {id: newVenta.id}
          },
          vendidos: producto?.vendidos+item.cantidadavender,
          stock: producto?.stock != 0 ? producto!.stock-item.cantidadavender : 0,
        }
      })
    })
    
  
    return NextResponse.json({
      message: "create succes",
      body: newVenta
    })

  } catch (error) {

    if(error instanceof Error){
      return NextResponse.json({
        mesage: error.message
      },
      {
        status: 500,
      })
    }
    
  }
  
}

export async function GET(){
  try {
    
    const allData = await prisma.ventas.findMany({include:{productos:true}});

    return NextResponse.json({
      message: "succes",
      body: allData
    })

  } catch (error) {

    if(error instanceof Error){
      return NextResponse.json({
        mesage: error.message
      },
      {
        status: 500,
      })
    }
    
  }
}