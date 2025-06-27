'use client'

import React, { useState, useEffect } from 'react'

interface Producto {
  nombre: string
  cantidad: number
  precioTotal: number
}

interface VentaServicio {
  idVentaServicio: number
  cliente: { idCliente: number, nombre: string }
  tecnico: { idUsuario: number, nombre: string }
  descuento: number
  costoTotal: number
  fechaRegistro: string
  detallesServicio: {
    idDetalleServicio: number
    servicio: { idServicio: number, nombre: string, costo: number }
    costoTotal: number
    descuento: number
  }[]
  productos: {
    idProductoDetalleVenta: number
    producto: { idProducto: number, nombre: string }
    cantidad: number
    precioTotal: number
  }[]
}

interface ModalRegistroServicioProps {
  onClose: () => void
  onRegistrar: (venta: VentaServicio) => void
}

export default function ModalRegistroServicio({ onClose, onRegistrar }: ModalRegistroServicioProps) {
  const [form, setForm] = useState({
    cliente: '',
    tecnico: '',
    servicio: '',
    costo: '',
    descuento: '0'
  })

  const [productos, setProductos] = useState<Producto[]>([])
  const [producto, setProducto] = useState<{ nombre: string, cantidad: string, precio: string }>({
    nombre: '',
    cantidad: '',
    precio: ''
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }

  const agregarProducto = () => {
    const { nombre, cantidad, precio } = producto
    const cantidadNum = parseFloat(cantidad)
    const precioNum = parseFloat(precio)

    if (!nombre || isNaN(cantidadNum) || isNaN(precioNum)) {
      alert('Completa todos los campos del producto.')
      return
    }

    const nuevoProducto: Producto = {
      nombre,
      cantidad: cantidadNum,
      precioTotal: cantidadNum * precioNum
    }

    setProductos([...productos, nuevoProducto])
    setProducto({ nombre: '', cantidad: '', precio: '' })
  }

  const registrar = () => {
    const { cliente, tecnico, servicio, costo, descuento } = form
    if (!cliente || !tecnico || !servicio || !costo) {
      alert('Completa los campos obligatorios.')
      return
    }

    const venta: VentaServicio = {
      idVentaServicio: Date.now(),
      cliente: { idCliente: 1, nombre: cliente },
      tecnico: { idUsuario: 1, nombre: tecnico },
      descuento: parseFloat(descuento),
      costoTotal: parseFloat(costo),
      fechaRegistro: new Date().toISOString(),
      detallesServicio: [{
        idDetalleServicio: 1,
        servicio: { idServicio: 1, nombre: servicio, costo: parseFloat(costo) },
        costoTotal: parseFloat(costo),
        descuento: parseFloat(descuento)
      }],
      productos: productos.map((p, i) => ({
        idProductoDetalleVenta: i + 1,
        producto: { idProducto: i + 1, nombre: p.nombre },
        cantidad: p.cantidad,
        precioTotal: p.precioTotal
      }))
    }

    onRegistrar(venta)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-scrollable">
        <div className="modal-header">
          <h2 className="text-lg font-semibold">📝 Registrar Servicio</h2>
          <button onClick={onClose} className="close-btn text-lg">✖</button>
        </div>

        <div className="modal-content grid gap-3 mt-3">
          {['cliente', 'tecnico', 'servicio'].map((campo) => (
            <div key={campo}>
              <label className="text-sm font-medium capitalize">{campo} *</label>
              <input
                className="search-input"
                name={campo}
                value={form[campo as keyof typeof form]}
                onChange={handleFormChange}
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium">Costo del Servicio *</label>
            <input
              type="number"
              name="costo"
              className="search-input"
              value={form.costo}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descuento (opcional)</label>
            <input
              type="number"
              name="descuento"
              className="search-input"
              value={form.descuento}
              onChange={handleFormChange}
            />
          </div>

          <div className="border rounded p-3 bg-gray-50 mt-4">
            <h3 className="text-sm font-bold text-gray-700 mb-2"> Productos Utilizados (opcional)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                name="nombre"
                placeholder="Producto"
                className="search-input"
                value={producto.nombre}
                onChange={handleProductoChange}
              />
              <input
                name="cantidad"
                type="number"
                placeholder="Cantidad"
                className="search-input"
                value={producto.cantidad}
                onChange={handleProductoChange}
              />
              <input
                name="precio"
                type="number"
                placeholder="Precio Unitario"
                className="search-input"
                value={producto.precio}
                onChange={handleProductoChange}
              />
            </div>

            <button className="primary-btn mt-3" onClick={agregarProducto}>Agregar Producto</button>

            {productos.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                {productos.map((p, i) => (
                  <li key={i}>{p.nombre} x{p.cantidad} — S/ {p.precioTotal.toFixed(2)}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="modal-actions mt-5">
          <button className="primary-btn" onClick={registrar}>✅ Registrar Servicio</button>
        </div>
      </div>
    </div>
  )
}
