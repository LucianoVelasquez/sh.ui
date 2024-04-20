import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'


/* Ultimas 10 ventas realizadas. */
export async function GET() {
  try {
    
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    let findVentas = await prisma.ventas.findMany({where:{userId:findId?.id},include:{cliente:{}}});

    if(!findVentas) throw new Error("No hay ventas");

    const fechaActual = new Date();
    let fehcaLimite = new Date(fechaActual);
    let cantidad = 10;
    fehcaLimite.setDate(fechaActual.getDate() - 7)
    let newFiltro : any = [];

    findVentas = findVentas.sort((a,b) => b.precioTotal - a.precioTotal);

    findVentas = findVentas.filter((item) => item.createdAt >= fehcaLimite && item.createdAt <= fechaActual)

    if(findVentas.length < 10){
      cantidad = findVentas.length;
    }

    for(let i = 0;i < cantidad;i++){
      newFiltro.push(findVentas[i])
    }

    return NextResponse.json({newFiltro})

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