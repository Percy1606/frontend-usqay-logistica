'use client'

import React, { useState } from 'react'

interface ProductoForm {
  nombre: string
  cantidad: number
  precioTotal: number
}

interface Props {
  onRegistrarVenta: (venta: any) => void
}

export default function ServiceForm({ onRegistrarVenta }: Props) {
  const [cliente, setCliente] = useState('')
  const [tecnico, setTecnico] = useState('')
  const [servicio, setServicio] = useState('')
  const [costo, setCosto] = useState('')
  const [descuento, setDescuento] = useState('0')
  const [productos, setProductos] = useState<ProductoForm[]>([])
  const [showAddProduct, setShowAddProduct] = useState(false)

  const [prodNombre, setProdNombre] = useState('')
  const [prodCantidad, setProdCantidad] = useState(1)
  const [prodPrecio, setProdPrecio] = useState(0)

  const handleAddProducto = () => {
    const nuevo = {
      nombre: prodNombre,
      cantidad: prodCantidad,
      precioTotal: prodCantidad * prodPrecio
    }
    setProductos([...productos, nuevo])
    setProdNombre('')
    setProdCantidad(1)
    setProdPrecio(0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevaVenta = {
      idVentaServicio: Date.now(),
      cliente: { idCliente: 1, nombre: cliente },
      tecnico: { idUsuario: 1, nombre: tecnico },
      descuento: parseFloat(descuento),
      costoTotal: parseFloat(costo),
      fechaRegistro: new Date().toISOString(),
      detallesServicio: [
        {
          idDetalleServicio: 1,
          servicio: { idServicio: 1, nombre: servicio, costo: parseFloat(costo) },
          costoTotal: parseFloat(costo),
          descuento: parseFloat(descuento)
        }
      ],
      productos: productos.map((p, index) => ({
        idProductoDetalleVenta: index + 1,
        producto: { idProducto: index + 1, nombre: p.nombre },
        cantidad: p.cantidad,
        precioTotal: p.precioTotal
      }))
    }
    onRegistrarVenta(nuevaVenta)
    setCliente('')
    setTecnico('')
    setServicio('')
    setCosto('')
    setDescuento('0')
    setProductos([])
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        type="text"
        placeholder="Nombre del Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="search-input"
        required
      />
      <input
        type="text"
        placeholder="Técnico Responsable"
        value={tecnico}
        onChange={(e) => setTecnico(e.target.value)}
        className="search-input"
        required
      />
      <input
        type="text"
        placeholder="Servicio Realizado"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        className="search-input"
        required
      />
      <input
        type="number"
        placeholder="Costo del Servicio"
        value={costo}
        onChange={(e) => setCosto(e.target.value)}
        className="search-input"
        required
      />
      <input
        type="number"
        placeholder="Descuento"
        value={descuento}
        onChange={(e) => setDescuento(e.target.value)}
        className="search-input"
      />

      <button
        type="button"
        className="primary-btn"
        onClick={() => setShowAddProduct(!showAddProduct)}
      >
        ➕ Agregar Producto
      </button>

      {showAddProduct && (
        <div className="grid gap-2 border p-4 rounded bg-gray-50">
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={prodNombre}
            onChange={(e) => setProdNombre(e.target.value)}
            className="search-input"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={prodCantidad}
            onChange={(e) => setProdCantidad(Number(e.target.value))}
            className="search-input"
          />
          <input
            type="number"
            placeholder="Precio Unitario"
            value={prodPrecio}
            onChange={(e) => setProdPrecio(Number(e.target.value))}
            className="search-input"
          />
          <button type="button" className="primary-btn" onClick={handleAddProducto}>
            ✅ Añadir a Lista
          </button>
          <ul>
            {productos.map((p, i) => (
              <li key={i}>
                {p.nombre} x{p.cantidad} — S/ {p.precioTotal}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" className="primary-btn">
        Registrar Servicio
      </button>
    </form>
  )
}
