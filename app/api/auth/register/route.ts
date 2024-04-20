import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import { FormData } from '../../../auth/register/page';



export async function POST(request: Request) {
  try {
    
    const  info : FormData = await request.json();
    console.log(info);
    
    const find = await prisma.user.findUnique({where:{ email: info.email}});
    
    if(find != undefined) throw new Error("Ya existe el usuario")

    const newUser : FormData = {username: info.username,email: info.email,password: info.password}

    const sendUser = await prisma.user.create({data: newUser})
  
    return NextResponse.json({
      message: "user creado",
      body: sendUser
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

