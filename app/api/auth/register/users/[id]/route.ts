import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

interface UseView{
  id: number
  email: string,
  username: string
}
interface params{
  params:{
    id:string
  }
}

export async function GET(request: Request, {params} : params){
  try {

    const { id } = params;  
    
    
    const info = await prisma.user.findUnique({where: {email: id }})

    if(!info) throw new Error(`No se encontro usuario con ese Email: ${id}`)
    
    const newInfo= {id: info.id, username: info.username};
    
    return NextResponse.json({
      message: "succes",
      body: newInfo
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