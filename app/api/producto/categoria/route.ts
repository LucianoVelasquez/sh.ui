import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
/* Filtra por cantidad de productos vendidos por categoria. */
export async function GET() {
  try {
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    const cantidadCategoria = await prisma.categoria.findMany({where:{userId:findId?.id}});
    
    let data : any = []
    let newData = []
    let cantidad = 0;
    
   
    for(let i = 0; i < cantidadCategoria.length;i++){
      let cantidadTotal = 0
      let info = await prisma.producto.findMany({where: {categoriaId:cantidadCategoria[i].id}});
      info.map((item) => {
        cantidadTotal += item.vendidos;
      })
      
      data.push({name: cantidadCategoria[i].nombre, value: cantidadTotal});
     
    }
    data = data.sort((a :any,b:any) => b.catidadVendida - a.catidadVendida);

    if(cantidadCategoria.length > 5){
      cantidad = 5
    }else{
      cantidad = cantidadCategoria.length;
    }

    for(let i = 0; i < cantidad; i++){
      newData[i] = data[i];
    }

    
    return NextResponse.json(newData)

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

export async function POST(request: Request){
  try {
    
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})
    
    const info = await request.json()
    

    const findCategoria = await prisma.categoria.findFirst({where: {nombre:info.nombre,userId:findId?.id}})
    
    if(findCategoria != null ) throw new Error("La categoria ya existe");

    const newCategoria = await prisma.categoria.create({data:{
      nombre:info.nombre,
      userId:findId?.id
    }})

    

    return NextResponse.json({
      message: "exito",
      body:newCategoria
    })

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