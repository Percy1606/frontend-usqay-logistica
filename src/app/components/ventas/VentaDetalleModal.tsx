'use client';

import React from 'react';
import { VentaServicio } from '../../../entities/venta';
import { formatCurrency, formatDate } from '../../../lib/logistica/formatters';

type Props = {
  venta: VentaServicio;
  onClose: () => void;
};

const VentaDetalleModal = ({ venta, onClose }: Props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-lg bg-white p-6 rounded shadow-md print:p-0 print:shadow-none print:max-w-full">
        <div className="flex justify-between items-center mb-4 print:hidden">
          <h2 className="text-xl font-bold text-indigo-700">
            🧾 {venta.tipoComprobante ?? 'Boleta/Factura'} #{venta.idVentaServicio}
          </h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700 text-xl">✖</button>
        </div>

        <div className="mb-4 border-b pb-4 text-sm text-gray-700">
          <p><strong>Cliente:</strong> {venta.cliente.nombre}</p>
          <p><strong>Teléfono:</strong> {venta.cliente.telefono}</p>
          <p><strong>Correo:</strong> {venta.cliente.correo}</p>
          <p><strong>Fecha:</strong> {formatDate(venta.fechaRegistro)}</p>
          <p><strong>Medio de pago:</strong> {venta.medioPago ?? 'No especificado'}</p>
        </div>

        {venta.detalles.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">🛠 Servicios:</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              {venta.detalles.map((d) => (
                <li key={d.idDetalleServicio} className="flex justify-between">
                  <span>{d.nombreServicio ?? d.servicio?.nombre ?? 'Servicio'} x{d.cantidad ?? 1}</span>
                  <span>{formatCurrency(d.costoTotal)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {venta.productos && venta.productos.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">📦 Productos:</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              {venta.productos.map((p, i) => (
                <li key={i} className="flex justify-between">
                  <span>{p.nombreProducto} x{p.cantidad}</span>
                  <span>{formatCurrency(p.precioTotal)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t pt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Descuento:</span>
            <span className="text-red-600">{formatCurrency(venta.descuento)}</span>
          </div>
          <div className="flex justify-between font-bold text-green-700 text-lg mt-2">
            <span>Total:</span>
            <span>{formatCurrency(venta.costoTotal)}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            🖨 Imprimir
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VentaDetalleModal;
