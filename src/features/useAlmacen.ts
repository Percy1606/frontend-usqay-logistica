import { useState } from "react";
import { Movimiento, MovimientoTipo, Producto } from "@/entities/almacen";

/**
 * Hook personalizado para manejar la lógica de inventario de almacén.
 */
export function useAlmacen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  /**
   * Registra un movimiento de producto (entrada, salida o transferencia).
   */
  const registrarMovimiento = (
    productoId: number,
    tipo: MovimientoTipo,
    cantidad: number,
    ubicacionActual: string,
    destino?: string
  ) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    let nuevoStock = producto.stock;

    if (tipo === "entrada") {
      nuevoStock += cantidad;
    } else if (tipo === "salida") {
      nuevoStock -= cantidad;
    } else if (tipo === "transferencia") {
      nuevoStock -= cantidad; // se descuenta de la ubicación actual
    }

    const productoActualizado: Producto = {
      ...producto,
      stock: nuevoStock
    };

    setProductos(prev =>
      prev.map(p => (p.id === productoId ? productoActualizado : p))
    );

    const nuevoMovimiento: Movimiento = {
      id: Date.now(),
      productoId,
      tipo,
      cantidad,
      fecha: new Date().toISOString(),
      origen: ubicacionActual,
      destino
    };

    setMovimientos(prev => [...prev, nuevoMovimiento]);
  };

  return {
    productos,
    setProductos,
    movimientos,
    registrarMovimiento
  };
}
