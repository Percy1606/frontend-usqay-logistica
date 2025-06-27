// src/entities/venta.ts

export interface Cliente {
  idCliente: string;
  nombre: string;
  telefono: string;
  correo: string;
}

export interface ProductoDetalleVenta {
  idProductoDetalle: string;
  nombreProducto: string;
  cantidad: number;
  precioTotal: number;
}

export interface DetalleServicio {
  idDetalleServicio: string;
  idServicio: string;
  nombreServicio: string;
  costoTotal: number;
  cantidad: number;
}

export interface VentaServicio {
  idVentaServicio: string;
  cliente: Cliente;
  detalles: DetalleServicio[];
  descuento: number;
  costoTotal: number;
  fechaRegistro: string;
  productos?: ProductoDetalleVenta[];
}
