import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface productoI {
  id?: number
  precio: number
  nombre: string
  stock: number
  categoria: string
  cantidadavender? : number
}

export interface User{
  id: string
  username:string
}

export interface Cliente{
  id: string
  nombre: string
  deudaTotal: number
}

export interface ClienteVenta{
  id: string,
  nombre: string
}

export interface Categoria{
  id:string
  nombre: string
}

export interface productosI {
  productos : productoI[]
  ventas : productoI[]
  user : User
  clientes: Cliente[]
  clienteVenta: ClienteVenta
  categorias: Categoria[]
  selectCategoria: string
  url: string
}

const initialState : productosI = {
  productos: [],
  ventas: [],
  user: {id:"",username:""},
  clientes: [],
  clienteVenta: {id: "",nombre:""},
  categorias: [],
  selectCategoria: "",
  url: ""
}

export const productosSlice = createSlice({
  name: "productosState",
  initialState,
  reducers: {
    addAllProducts: (state, action: PayloadAction<productoI[]>) => {
      state.productos = action.payload;
      
    },
    removeProducById : (state, action : PayloadAction<number>) =>{
      state.productos = state.productos.filter((e) => e.id != action.payload)
    },
    removeSelected: (state,action: PayloadAction<productoI[]>) => {
      const ids = action.payload.map(e => e.id);
      
      for (let i = 0; i < ids.length; i++) {
        state.productos = state.productos.filter(e => e.id != ids[i]);
      }

    },
    addProduct: (state,action: PayloadAction<any>) =>{

    state.productos = [...state.productos,action.payload];
    },
    updateProduct: (state,action: PayloadAction<any>)=>{
      
      state.productos = state.productos.map((item) => {
        if(item.id == action.payload.id){
          item.nombre = action.payload.nombre;
          item.precio = action.payload.precio;
          item.stock = action.payload.stock;
          item.categoria = action.payload.categoria
        }
        return item;
      })

    },
    addVentas: (state,action: PayloadAction<any>)=>{
      
      let findId = state.ventas.find((item) => item.id == action.payload.id);

      if(findId == undefined){
        
         state.ventas = [...state.ventas, action.payload]
         state.ventas = state.ventas.sort((a,b) => a.precio - b.precio);

      }else{

        state.ventas = state.ventas.map((item:any) => {
          if(item.id == findId!.id){
            item.cantidadavender += action.payload.cantidadavender;
          }
          return item;
        });

        state.ventas = state.ventas.sort((a,b) => a.precio - b.precio);
        
      }

    },
    removeVentas: (state,action: PayloadAction<number>)=>{

      state.ventas = state.ventas.filter((item) => item.id != action.payload)

    },
    updateVentas: (state,action: PayloadAction<any>)=>{
      state.ventas = state.ventas.map((item) =>{
        if(item.id == action.payload.id){
          item.cantidadavender = action.payload.data
        }
        return item;
      })
    },
    clearVentas: (state)=>{
      state.ventas = [];
    },
    setLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload; 
    },
    closedSession: (state) => {
      state.user = {id:"",username:""}
    },
    loadingClientes: (state,action : PayloadAction<any>)=>{
      
      state.clientes = action.payload
    },
    addClientes: (state,action: PayloadAction<any>)=>{
      let {id,nombre,deudaTotal } = action.payload;
      state.clientes = [...state.clientes,{id:id,nombre:nombre,deudaTotal:deudaTotal}]
    },
    updateCliente: (state,action : PayloadAction<any>)=>{
      state.clientes = state.clientes.map((item) =>{
        if(item.nombre == action.payload.nombre){
          item.deudaTotal -= parseInt(action.payload.deudaTotal)
        }
        return item;
      })
    },
    deleteClienteL: (state,action:PayloadAction<any>)=>{
      state.clientes = state.clientes.filter((item) => item.nombre != action.payload.nombre);
    },
    addClienteVenta: (state,action: PayloadAction<any>)=>{

      if(action.payload){
        state.clienteVenta = {nombre:action.payload.value,id:action.payload.id};
      }else{
        state.clienteVenta = {id:"",nombre:""}
      }
      
    },
    clearClienteVenta: (state)=>{
      state.clienteVenta = {id:"",nombre:""};
    },
    loadingCategorias: (state,action: PayloadAction<any>)=>{
      state.categorias = action.payload;
    },
    updateCategoria: (state,action:PayloadAction<any>)=>{
      state.categorias = [...state.categorias,action.payload]
    },
    categoriaSelec: (state,action:PayloadAction<any>)=>{
      state.selectCategoria = action.payload;
    },
    clearCategoria: (state)=>{
      state.selectCategoria = ""
    },
    addUrl: (state,action:PayloadAction<any>)=>{
      state.url = action.payload
    }
  },
})


export const { removeSelected,removeProducById, addAllProducts,addProduct,updateProduct,addVentas,removeVentas,updateVentas,clearVentas,setLogin,closedSession,addClientes,loadingClientes,updateCliente,deleteClienteL,addClienteVenta,clearClienteVenta,loadingCategorias,updateCategoria,categoriaSelec,clearCategoria,addUrl } = productosSlice.actions;

export default productosSlice.reducer
