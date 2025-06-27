'use client'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Producto } from '@/shared/types/product.types'

interface TablaProps {
  productos: Producto[]
  onEditar?: (producto: Producto) => void
  onEliminar?: (idProducto: number) => void
}

export default function TablaProductos({ productos, onEditar, onEliminar }: TablaProps) {
  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th className="text-left">Producto</th>
            <th className="text-center">Descripción</th>
            <th className="text-center">Stock</th>
            <th className="text-right">Precio</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={producto.idProducto || `temp-${index}`}>
              <td className="product-info">
                <div className="product-name">{producto.nombre}</div>
              </td>
              <td className="text-center">{producto.descripcion}</td>
              <td className="text-center">
                <span className={`stock-badge ${producto.stock > 10 ? 'high' : 'low'}`}>
                  {producto.stock}
                </span>
              </td>
              <td className="text-right">
                {producto.precio.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN'
                })}
              </td>
              <td className="text-center">
                <div className="actions-container">
                  <button
                    className="action-btn edit"
                    title="Editar"
                    onClick={() => {
                      console.log('Botón de editar clicado para:', producto);
                      onEditar?.(producto);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn delete"
                    title="Eliminar"
                    onClick={() => {
                      if (onEliminar && producto.idProducto) {
                        onEliminar(Number(producto.idProducto));
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
