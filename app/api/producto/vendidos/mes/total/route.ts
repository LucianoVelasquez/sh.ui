import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'

/* Ultimas 10 ventas realizadas. */
export async function GET() {
  try {

    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})
    
    let findVentas = await prisma.ventas.findMany({where:{userId:findId?.id}});
    
    
    let totalVendido = 0;
    if(!findVentas) throw new Error("No hay ventas");

    const fechaActual = new Date();
    let fehcaLimite = new Date(fechaActual);
    fehcaLimite.setDate(fechaActual.getDate() - 30)

    findVentas = findVentas.filter((item) => item.createdAt >= fehcaLimite && item.createdAt <= fechaActual)
   

    findVentas.map((item) =>{
      totalVendido += item.precioTotal;
    })

    return NextResponse.json({
      message: "exito",
      body: totalVendido
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