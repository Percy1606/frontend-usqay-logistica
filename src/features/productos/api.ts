import { Producto } from '@/shared/types/product.types';

// Usar una URL relativa para evitar problemas de CORS
const API = "/api/productos";

export async function obtenerProductos(): Promise<Producto[]> {
  try {
    console.log("Intentando obtener productos desde:", API);
    const res = await fetch(API);
    console.log("Respuesta recibida:", res.status, res.statusText);
    if (!res.ok) {
      const errorText = await res.text().catch(() => "No se pudo leer el texto del error");
      console.error("Error al cargar productos:", res.status, res.statusText, errorText);
      throw new Error(`Error al cargar productos: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Excepción al cargar productos:", error);
    throw error;
  }
}

export async function crearProducto(producto: Partial<Producto>): Promise<Producto> {
  try {
    console.log("Intentando crear producto:", producto);
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    console.log("Respuesta recibida:", res.status, res.statusText);
    if (!res.ok) {
      const errorText = await res.text().catch(() => "No se pudo leer el texto del error");
      console.error("Error al crear producto:", res.status, res.statusText, errorText);
      throw new Error(`Error al crear producto: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Excepción al crear producto:", error);
    throw error;
  }
}

export async function eliminarProducto(idProducto: number): Promise<void> {
  try {
    console.log("Intentando eliminar producto con idProducto:", idProducto);
    const res = await fetch(`${API}/${idProducto}`, { 
      method: "DELETE"
    });
    console.log("Respuesta recibida:", res.status, res.statusText);
    if (!res.ok) {
      const errorText = await res.text().catch(() => "No se pudo leer el texto del error");
      console.error("Error al eliminar producto:", res.status, res.statusText, errorText);
      throw new Error(`Error al eliminar producto: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Excepción al eliminar producto:", error);
    throw error;
  }
}

export async function actualizarProducto(idProducto: number, producto: Partial<Producto>): Promise<Producto> {
  try {
    console.log("Intentando actualizar producto con idProducto:", idProducto, "datos:", producto);
    const res = await fetch(`${API}/${idProducto}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    console.log("Respuesta recibida:", res.status, res.statusText);
    if (!res.ok) {
      const errorText = await res.text().catch(() => "No se pudo leer el texto del error");
      console.error("Error al actualizar producto:", res.status, res.statusText, errorText);
      throw new Error(`Error al actualizar producto: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Excepción al actualizar producto:", error);
    throw error;
  }
}
