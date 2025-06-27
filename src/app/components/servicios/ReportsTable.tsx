'use client'

import React, { useState } from 'react'
import { VentaServicio } from '../../../entities/servicios'

interface Props {
  reports: VentaServicio[]
  technicianOptions: { idUsuario: number; nombre: string }[]
  formatCurrency: (value: number) => string
  formatDate: (iso: string) => string
  exportToCSV: (venta: VentaServicio) => void
  viewReportDetails?: (venta: VentaServicio) => void // compatibilidad
}

export default function ReportsTable({
  reports = [],
  technicianOptions,
  formatCurrency,
  formatDate,
  exportToCSV
}: Props) {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null)

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
          {reports.map((venta) => (
            <React.Fragment key={venta.idVentaServicio}>
              <tr>
                <td>{venta.idVentaServicio}</td>
                <td>{venta.cliente.nombre}</td>
                <td>{venta.tecnico.nombre}</td>
                <td>
                  {venta.detallesServicio.map(ds => (
                    <div key={ds.idDetalleServicio}>
                      {ds.servicio.nombre} (S/ {formatCurrency(ds.costoTotal)})
                    </div>
                  ))}
                </td>
                <td>
                  {venta.productos.map(p => (
                    <div key={p.idProductoDetalleVenta}>
                      {p.producto.nombre} x{p.cantidad} (S/ {formatCurrency(p.precioTotal)})
                    </div>
                  ))}
                </td>
                <td>{venta.descuento ? `S/ ${formatCurrency(venta.descuento)}` : '—'}</td>
                <td>{formatCurrency(venta.costoTotal)}</td>
                <td>{formatDate(venta.fechaRegistro)}</td>
                <td>
                  <button
                    className="action-btn view"
                    onClick={() => setExpandedRowId(expandedRowId === venta.idVentaServicio ? null : venta.idVentaServicio)}
                  >
                    {expandedRowId === venta.idVentaServicio ? 'Ocultar' : 'Ver'}
                  </button>
                  <button className="action-btn export" onClick={() => exportToCSV(venta)}>
                    Exportar
                  </button>
                </td>
              </tr>
              {expandedRowId === venta.idVentaServicio && (
                <tr>
                  <td colSpan={9}>
                    <div className="p-2 bg-gray-100 rounded">
                      <strong>Detalles del Reporte</strong>
                      <p><strong>Fecha:</strong> {formatDate(venta.fechaRegistro)}</p>
                      <p><strong>Cliente:</strong> {venta.cliente.nombre}</p>
                      <p><strong>Técnico:</strong> {venta.tecnico.nombre}</p>
                      <p><strong>Descuento:</strong> S/ {formatCurrency(venta.descuento)}</p>
                      <p><strong>Costo Total:</strong> S/ {formatCurrency(venta.costoTotal)}</p>

                      <h4 className="mt-2">Servicios:</h4>
                      <ul>
                        {venta.detallesServicio.map(s => (
                          <li key={s.idDetalleServicio}>
                            {s.servicio.nombre} — S/ {formatCurrency(s.costoTotal)}
                          </li>
                        ))}
                      </ul>

                      {venta.productos.length > 0 && (
                        <>
                          <h4 className="mt-2">Productos:</h4>
                          <ul>
                            {venta.productos.map(p => (
                              <li key={p.idProductoDetalleVenta}>
                                {p.producto.nombre} x{p.cantidad} — S/ {formatCurrency(p.precioTotal)}
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
          {reports.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center">No hay reportes generados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
