export interface Producto {
  /** ID único del producto (puede ser numérico o string si se usa UUID) */
  idProducto: string | number;

  /** Nombre comercial del producto */
  nombre: string;

  /** Breve descripción del producto */
  descripcion: string;

  /** Precio por unidad del producto */
  precio: number;

  /** Cantidad en stock */
  stock: number;

  /** Categoría del producto */
  categoria: string;

  /** Fecha de ingreso o creación del producto en el sistema */
  createdAt: string;

  /** Fecha de última actualización del producto en el sistema */
  updatedAt: string;
}
