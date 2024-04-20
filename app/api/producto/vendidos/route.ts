import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'

/* Filtra los primeros 5 productos mas vendidos */
export async function GET() {
  try {
    
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    let info = await prisma.producto.findMany({where: {userId:findId?.id}});
    let data = [];
    let cantidad;

    if(info.length  > 5) {
      cantidad = 5;
    } else{
      cantidad = info.length;
    }

    info = info.sort((a,b) => b.vendidos - a.vendidos );

    for(let i = 0; i < cantidad ;i++){
      data.push({
        name: info[i].nombre,
        Vendidos: info[i].vendidos
      })
    }
    

    return NextResponse.json(data)

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