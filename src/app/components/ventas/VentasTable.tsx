'use client';

import React, { useState } from 'react';
import { VentaServicio } from '../../../entities/venta';
import { formatCurrency, formatDate } from '../../../lib/logistica/formatters';
import VentaDetalleModal from './VentaDetalleModal';
import VentaEditarModal from './VentaEditarModal';

type ProductoDetalleVenta = {
  idProductoDetalle: string;
  nombreProducto: string;
  cantidad: number;
  precioTotal: number;
};

type Props = {
  ventas: (VentaServicio & { productos?: ProductoDetalleVenta[] })[];
};

const VentasTable = ({ ventas }: Props) => {
  const [ventaSeleccionada, setVentaSeleccionada] = useState<VentaServicio | null>(null);
  const [ventaAEditar, setVentaAEditar] = useState<VentaServicio | null>(null);

  const handleGuardar = (ventaActualizada: VentaServicio) => {
    setVentaAEditar(null);
    // Aquí podrías actualizar la venta en el estado global o backend
  };

  return (
    <>
      <div className="ventas-table-container overflow-x-auto rounded-lg border">
        <table className="ventas-table w-full">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Cliente</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Servicios</th>
              <th>Productos</th>
              <th className="text-right">Total</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.idVentaServicio} className="hover:bg-gray-50">
                <td>{venta.idVentaServicio}</td>
                <td>{venta.cliente?.nombre}</td>
                <td>{venta.cliente?.correo}</td>
                <td>{venta.cliente?.telefono}</td>
                <td>{formatDate(venta.fechaRegistro)}</td>
                <td>
                  <div className="text-sm text-gray-700">
                    {venta.detalles.map((d) => (
                      <div key={d.idDetalleServicio}>
                        {d.nombreServicio ?? d.servicio?.nombre ?? 'Servicio'}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="text-sm text-gray-700">
                    {venta.productos?.map((p, i) => (
                      <div key={i}>
                        {p.nombreProducto} x{p.cantidad}
                      </div>
                    )) || <span className="text-gray-400">—</span>}
                  </div>
                </td>
                <td className="text-right">{formatCurrency(venta.costoTotal)}</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      title="Ver comprobante"
                      onClick={() => setVentaSeleccionada(venta)}
                      className="modal-trigger-btn print"
                    >
                      📋
                    </button>
                    <button
                      title="Editar venta"
                      onClick={() => setVentaAEditar(venta)}
                      className="modal-trigger-btn edit"
                    >
                      ✏️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ventaSeleccionada && (
        <VentaDetalleModal
          venta={ventaSeleccionada}
          onClose={() => setVentaSeleccionada(null)}
        />
      )}
      {ventaAEditar && (
        <VentaEditarModal
          venta={ventaAEditar}
          onClose={() => setVentaAEditar(null)}
          onGuardar={handleGuardar}
        />
      )}
    </>
  );
};

export default VentasTable;
