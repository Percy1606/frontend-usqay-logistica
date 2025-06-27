'use client'
import React from 'react'
import { VentaServicio } from '../../../entities/servicios'

interface Props {
  selectedReport: VentaServicio
  setSelectedReport: (v: null) => void
  formatCurrency: (value: number) => string
  formatDate: (date: string) => string
  exportToCSV: (venta: VentaServicio) => void
}

export default function ReportModal({
  selectedReport,
  setSelectedReport,
  formatCurrency,
  formatDate,
  exportToCSV
}: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>🧾 Detalle del Reporte</h2>
          <button className="close-btn" onClick={() => setSelectedReport(null)}>
            ❌
          </button>
        </div>

        <div className="modal-body">
          <p><strong>ID Venta:</strong> {selectedReport.idVentaServicio}</p>
          <p><strong>Cliente:</strong> {selectedReport.cliente.nombre}</p>
          <p><strong>Técnico:</strong> {selectedReport.tecnico.nombre}</p>
          <p><strong>Fecha:</strong> {formatDate(selectedReport.fechaRegistro)}</p>
          <p><strong>Descuento:</strong> {formatCurrency(selectedReport.descuento)}</p>
          <p><strong>Costo Total:</strong> {formatCurrency(selectedReport.costoTotal)}</p>

          <h4 className="mt-4">Servicios:</h4>
          <ul>
            {selectedReport.detallesServicio.map(servicio => (
              <li key={servicio.idDetalleServicio}>
                {servicio.servicio.nombre} — {formatCurrency(servicio.costoTotal)}
              </li>
            ))}
          </ul>

          <h4 className="mt-4">Productos:</h4>
          <ul>
            {selectedReport.productos.map(prod => (
              <li key={prod.idProductoDetalleVenta}>
                {prod.producto.nombre} x{prod.cantidad} — {formatCurrency(prod.precioTotal)}
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <button className="primary-btn" onClick={() => exportToCSV(selectedReport)}>
            📤 Exportar a CSV
          </button>
        </div>
      </div>
    </div>
  )
}
