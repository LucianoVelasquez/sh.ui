import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

interface params{
  params:{
    id:string
  }
}

export async function GET({params} : params) {
  try {

    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    

    return NextResponse.json(findId)

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
export async function PUT(resquest : Request,{params} : params) {
  try {

    const info = await resquest.json();

    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.update({where: {email:userLogin.user.email},
    data:{
      username: info.username,
      password: info.password
    }})
    
    

    return NextResponse.json(findId)

  } catch (error) {

    if(error instanceof Error){
      return NextResponse.json({
        message: error.message
      },
      {
        status: 500,
      })
    }

  }
  
}