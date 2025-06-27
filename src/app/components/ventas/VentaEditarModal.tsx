'use client';

import React, { useState, useEffect } from 'react';
import { VentaServicio } from '../../../entities/venta';

interface Props {
  venta: VentaServicio | null;
  onClose: () => void;
  onGuardar: (ventaActualizada: VentaServicio) => void;
}

const VentaEditarModal = ({ venta, onClose, onGuardar }: Props) => {
  const [formData, setFormData] = useState<VentaServicio | null>(null);

  useEffect(() => {
    if (venta) {
      setFormData({ ...venta });
    }
  }, [venta]);

  if (!venta || !formData) return null;

  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            cliente: {
              ...prev.cliente,
              [name]: value,
            },
          }
        : prev
    );
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => (prev ? { ...prev, fechaRegistro: value } : prev));
  };

  const handleCostoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFormData((prev) =>
      prev ? { ...prev, costoTotal: isNaN(value) ? 0 : value } : prev
    );
  };

  const handleGuardarClick = () => {
    if (formData) {
      onGuardar(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-xl">
        <button
          className="modal-close-btn absolute top-4 right-4"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-indigo-700 mb-4">
          ✏️ Editar Venta #{formData.idVentaServicio}
        </h2>

        <div className="grid grid-cols-1 gap-4 text-sm">
          <label className="font-medium">
            Nombre del Cliente:
            <input
              type="text"
              name="nombre"
              value={formData.cliente.nombre}
              onChange={handleClienteChange}
              className="mt-1 w-full border p-2 rounded"
            />
          </label>

          <label className="font-medium">
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.cliente.correo}
              onChange={handleClienteChange}
              className="mt-1 w-full border p-2 rounded"
            />
          </label>

          <label className="font-medium">
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={formData.cliente.telefono}
              onChange={handleClienteChange}
              className="mt-1 w-full border p-2 rounded"
            />
          </label>

          <label className="font-medium">
            Fecha de Venta:
            <input
              type="date"
              value={formData.fechaRegistro?.slice(0, 10)}
              onChange={handleFechaChange}
              className="mt-1 w-full border p-2 rounded"
            />
          </label>

          <label className="font-medium">
            Total (S/):
            <input
              type="number"
              value={formData.costoTotal}
              onChange={handleCostoChange}
              className="mt-1 w-full border p-2 rounded"
              min="0"
              step="0.01"
            />
          </label>

          <div>
            <p className="font-medium mb-1">Servicios Incluidos:</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {formData.detalles.map((detalle, i) => (
                <li key={i}>
                  {detalle.nombreServicio ?? detalle.servicio?.nombre ?? 'Servicio'} x{detalle.cantidad ?? 1}
                </li>
              ))}
            </ul>
          </div>

          {formData.productos && formData.productos.length > 0 && (
            <div>
              <p className="font-medium mb-1">Productos Incluidos:</p>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                {formData.productos.map((producto: any, i: number) => (
                  <li key={i}>
                    {producto.nombreProducto ?? 'Producto'} x{producto.cantidad ?? 1}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleGuardarClick}
            className="modal-trigger-btn add"
          >
            💾 Guardar
          </button>
          <button
            onClick={onClose}
            className="modal-trigger-btn view"
          >
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VentaEditarModal;
