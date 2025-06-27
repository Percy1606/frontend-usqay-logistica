export interface Servicio {
  idServicio: number
  nombre: string
  costo: number
}

export interface Producto {
  idProducto: number
  nombre: string
}

export interface VentaServicio {
  idVentaServicio: number
  cliente: {
    idCliente: number
    nombre: string
  }
  tecnico: {
    idUsuario: number
    nombre: string
  }
  descuento: number
  costoTotal: number
  fechaRegistro: string
  detallesServicio: {
    idDetalleServicio: number
    servicio: Servicio
    costoTotal: number
    descuento: number
  }[]
  productos: {
    idProductoDetalleVenta: number
    producto: Producto
    cantidad: number
    precioTotal: number
    descuento?: number
  }[]
}
