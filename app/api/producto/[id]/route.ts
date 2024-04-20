import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma';

interface params{
  params:{
    id:string
  }
}

export async function GET(request: Request, {params} : params) {
   try {

    const number = params.id;
    const newGet = await prisma.producto.findFirst({where: {id: parseInt(number)}})

    return NextResponse.json(newGet);

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

export async function DELETE(request: Request, { params } : params){

  try {
    
    const newDelete = await prisma.producto.delete({
      where:{
        id: parseInt(params.id)
      }
    })
    
    const {id,categoria,nombre,precio,stock} = newDelete;

    return NextResponse.json({
      message: 'succes',
      body: {id,categoria,nombre,precio,stock},
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

/* NOTA: SI NO EXISTE LA LA CATEGORIA CREARLA Y AGREGARLE EL NUEVO ID DE CATEGORIA */
export async function PUT(resquest: Request, { params } : params){
  try {

    const info = await resquest.json();
    let number = params.id;
    
    const findCategoria = await prisma.categoria.findFirst({where:{nombre: info.categoria,userId:info.userId}});
    

    if(!findCategoria){

      const newCategoria = await prisma.categoria.create({data:{nombre:info.categoria,userId: info.userId}});
      const newUpdate = await prisma.producto.update({where: {
          id: parseInt(number)
          },
          data: {
            nombre: info.nombre,
            precio: info.precio,
            stock: info.stock,
            categoriaId: newCategoria.id
          }
      }) 

      return NextResponse.json({
        message: newUpdate
      })


    }else{

      const newUpdate = await prisma.producto.update({where: {
        id: parseInt(number)
        },
        data: {
          nombre: info.nombre,
          precio: info.precio,
          stock: info.stock,
          categoriaId: findCategoria.id
        }
      })

      return NextResponse.json({
        message: newUpdate
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