import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { env } from "process";

/* Deveulve todos los clientes. */
export async function GET() {
  try {
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})


    let info = await prisma.cliente.findMany({where: {userId:findId?.id}});

    info = info.sort((a,b) => b.deudaTotal - a.deudaTotal);

    return NextResponse.json(info)

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

/* Crea un cliente y lo relaciona con el usuario Activo */
export async function POST(resquest : Request){
  try {

    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    const res = await resquest.json()
    if(!res) throw new Error("No hay datos");

    

    let data : any = {
      nombre: res.nombre,
      deudaTotal: 0,
      userId: res.userId
    }

    const newCliente = await prisma.cliente.create({data:{
      nombre: res.nombre,
      deudaTotal: 0,
      userId: res.userId
    }});
    
    
    return NextResponse.json({
      message: "Creado con exito",
      body: newCliente
    });
    
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

/* Modifica la deuda total de un cliente donde lo busca por nombre. */
export async function PUT(resquest : Request){
  try {
    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})
    const info = await resquest.json();
    
    if(!info) throw new Error("No existen datos")
    
    const findCLient = await prisma.cliente.findFirst({where: {nombre: info.nombre,userId:findId?.id},include:{ventas:{}}});

    if(!findCLient) throw new Error("No existe el usuario");
   
    
    /* Corroboramos si se paga el total de la deuda*/
    if((findCLient.deudaTotal-info.deudaTotal) == 0){
      findCLient.ventas.map(async (item) =>{
        await prisma.ventas.update({where:{id:item.id},data:{
          pago_pendiente:false,
        }})
      }) 
    }
    

    /* const newUpdate = await prisma.cliente.update({where: {nombre: info.nombre,userId:findId?.id}, data:{
      deudaTotal: findCLient?.deudaTotal - info.deudaTotal,
    }}) */

    const newUpdate = await prisma.cliente.update({
      where:{
        id: info.id,
        userId: findId?.id
      },
      data:{
        deudaTotal: findCLient.deudaTotal - info.deudaTotal
      }
    })
    
    return NextResponse.json({
      message: "succes",
      body:newUpdate
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
/* Elimina un cliente de la Base de datos */
export async function DELETE(resquest : Request){
  try {

    const userLogin : any = await getServerSession(authOptions);
    
    const findId = await prisma.user.findFirst({where: {email:userLogin.user.email}})

    const info = await resquest.json();
    if(!info) throw new Error("No hay datos");
   
    
    const findCLient = await prisma.cliente.findFirst({where: {nombre: info.nombre,userId:findId?.id},include:{ventas:{}}});

    if(!findCLient) throw new Error("No existe el usuario");
    
    
    findCLient.ventas.map(async (item) =>{
      await prisma.ventas.update({where:{id:item.id},data:{
        clienteId: null,
      }})
    }) 

    const newDelete = await prisma.cliente.delete({where: {id:findCLient.id,nombre:info.nombre}})
    
    
    return NextResponse.json({
      message:"exito",
      body: newDelete
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