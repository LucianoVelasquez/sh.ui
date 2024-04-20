import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
interface UseView{
  id: number
  email: string,
  username: string
}

export async function GET(){
  try {

    const info = await prisma.user.findMany();
    
    const newInfo : UseView[] = info.map<any>((item:any) => {
      return {id: item.id,email: item.email, username: item.username};
    })

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