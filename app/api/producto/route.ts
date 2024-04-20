import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { productoI } from '@/redux/features/productosSlice';
import { sign } from 'crypto';
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'


export async function GET() {
  try {
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    const info = await prisma.producto.findMany({where: {userId:findId?.id},include:{categoria:{}}});
   
    

    const data = info.map(item => {
      return{
        id: item.id,
        precio: item.precio,
        categoria: item.categoria?.nombre,
        nombre: item.nombre,
        stock: item.stock
      }
    })

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

export async function POST(request: Request) {
  try {

    const info = await request.json();
    if(info.userId == "") throw new Error("No exite el usuario")
    let newCategoria : any = {};
    

    const findCategory = await prisma.categoria.findFirst({where : {nombre: info.data.categoria,userId:info.userId}});
    
    if(!findCategory){

      newCategoria = await prisma.categoria.create({data:{nombre:info.data.categoria,userId: info.userId}});
      
      const newElemento = await prisma.producto.create({data:{
        nombre: info.data.nombre,
        precio: info.data.precio,
        stock: info.data.stock,
        userId: info.userId,
        categoriaId: newCategoria.id
      }})

      return NextResponse.json({
        message: "create succes",
        body: newElemento
      })
      
    }else{

      const newElemento = await prisma.producto.create({data:{
        nombre: info.data.nombre,
        precio: info.data.precio,
        stock: info.data.stock,
        userId: info.userId,
        categoriaId: findCategory.id
      }})

      return NextResponse.json({
        message: "create succes",
        body: newElemento
      })
      
    }

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