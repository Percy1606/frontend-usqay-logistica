'use client';
import React from 'react';
import { formatCurrency } from '../../../lib/logistica/formatters';

type Props = {
  open: boolean;
  onClose: () => void;
  totalVentas: number;
  totalIngresos: number;
  totalServicios: number;
  totalProductos: number;
  totalDescuentos: number;
};

const ResumenVentasModal = ({
  open,
  onClose,
  totalVentas,
  totalIngresos,
  totalServicios,
  totalProductos,
  totalDescuentos,
}: Props) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">📄 Resumen de Ventas</h2>

        <ul className="space-y-3 text-gray-700">
          <li>🧾 <strong>Ventas registradas:</strong> {totalVentas}</li>
          <li>💰 <strong>Total de ingresos:</strong> {formatCurrency(totalIngresos)}</li>
          <li>🛠 <strong>Servicios vendidos:</strong> {totalServicios}</li>
          <li>📦 <strong>Productos vendidos:</strong> {totalProductos}</li>
          <li>💸 <strong>Descuentos aplicados:</strong> {formatCurrency(totalDescuentos)}</li>
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumenVentasModal;
