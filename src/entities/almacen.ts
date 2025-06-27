export type MovimientoTipo = "entrada" | "salida" | "transferencia";

export interface Producto {
  id: number;
  nombre: string;
  stock: number;
  stockMinimo: number;
  ubicacion: string;
}

export interface Movimiento {
  id: number;
  productoId: number;
  tipo: MovimientoTipo;
  cantidad: number;
  fecha: string;
  origen?: string;
  destino?: string;
}

export interface InventarioFisicoRegistro {
  productoId: number;
  nombre: string;
  sistema: number;
  fisico: number;
}

export interface TransferenciaInterna {
  productoId: number;
  nombre: string;
  cantidad: number;
  origen: string;
  destino: string;
  fecha: string;
}
