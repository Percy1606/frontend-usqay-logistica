'use client'

import React, { useState } from 'react'
import { VentaServicio } from '../../../entities/servicios'

interface Props {
  ventas: VentaServicio[]
  searchTerm: string
  onExport?: (venta: VentaServicio) => void
  onView?: (venta: VentaServicio) => void // Puede mantenerse por compatibilidad
}

export default function ServicesTable({ ventas = [], searchTerm, onExport }: Props) {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null)

  const filtrados = ventas.filter(v =>
    v.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Cliente</th>
            <th>Técnico</th>
            <th>Servicios</th>
            <th>Productos</th>
            <th>Descuento</th>
            <th>Costo Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(v => (
            <React.Fragment key={v.idVentaServicio}>
              <tr>
                <td>{v.idVentaServicio}</td>
                <td>{v.cliente.nombre}</td>
                <td>{v.tecnico.nombre}</td>
                <td>
                  {v.detallesServicio.map(ds => (
                    <div key={ds.idDetalleServicio}>
                      {ds.servicio.nombre} (S/ {ds.costoTotal})
                    </div>
                  ))}
                </td>
                <td>
                  {v.productos.map(p => (
                    <div key={p.idProductoDetalleVenta}>
                      {p.producto.nombre} x{p.cantidad} (S/ {p.precioTotal})
                    </div>
                  ))}
                </td>
                <td>{v.descuento ? `S/ ${v.descuento}` : '—'}</td>
                <td>S/ {v.costoTotal}</td>
                <td>{new Date(v.fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <button
                    className="action-btn view"
                    onClick={() =>
                      setExpandedRowId(v.idVentaServicio === expandedRowId ? null : v.idVentaServicio)
                    }
                  >
                    {v.idVentaServicio === expandedRowId ? 'Ocultar' : 'Ver'}
                  </button>
                  <button className="action-btn export" onClick={() => onExport?.(v)}>Exportar</button>
                </td>
              </tr>
              {expandedRowId === v.idVentaServicio && (
                <tr>
                  <td colSpan={9}>
                    <div className="p-2 bg-gray-100 rounded">
                      <strong>Servicios:</strong>
                      <ul>
                        {v.detallesServicio.map(s => (
                          <li key={s.idDetalleServicio}>
                            {s.servicio.nombre} — S/ {s.costoTotal}
                          </li>
                        ))}
                      </ul>

                      {v.productos.length > 0 && (
                        <>
                          <strong className="mt-2">Productos:</strong>
                          <ul>
                            {v.productos.map(p => (
                              <li key={p.idProductoDetalleVenta}>
                                {p.producto.nombre} x{p.cantidad} — S/ {p.precioTotal}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          {filtrados.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center">No se encontraron resultados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
