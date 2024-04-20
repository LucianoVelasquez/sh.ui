import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'

/* Filtra por cantidad de productos vendidos por categoria. */
export async function GET() {
  try {

    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})
    
    const findAll = await prisma.categoria.findMany({where: {userId:findId?.id}});

    if(!findAll) throw new Error("No existen categorias");



    return NextResponse.json({
      message: "exito",
      body: findAll
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