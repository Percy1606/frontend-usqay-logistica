'use client'
import React, { useEffect } from 'react'

import { Producto } from '@/shared/types/product.types'

interface FormularioNuevoProductoModalProps {
  onAgregar: (producto: Partial<Producto> & { idProducto?: string | number }) => void
  onCerrar: () => void
  productoAEditar?: Producto | null
}

export default function FormularioNuevoProductoModal({
  onAgregar,
  onCerrar,
  productoAEditar
}: FormularioNuevoProductoModalProps) {
  const [formData, setFormData] = React.useState<Partial<Producto>>({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
  })

  useEffect(() => {
    if (productoAEditar) {
      setFormData({
        ...productoAEditar,
        precio: productoAEditar.precio,
        stock: productoAEditar.stock,
      })
    }
  }, [productoAEditar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const productoParaBackend = {
      idProducto: productoAEditar?.idProducto || undefined,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      stock: formData.stock
    }

    onAgregar(productoParaBackend)
    onCerrar()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{productoAEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={formData.precio || ''}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0 })}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock || ''}
          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
        />
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {productoAEditar ? 'Guardar cambios' : 'Crear'}
          </button>
          <button className="btn btn-secondary" onClick={onCerrar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
