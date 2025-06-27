// Archivo: src/app/components/cliente/HistorialVentasEmpresa.tsx
"use client";
import { FiX, FiPackage, FiSettings } from "react-icons/fi";

interface Props {
  idEmpresa: number;
  onClose: () => void;
}

// Ejemplo con ventas detalladas por tipo
const historialEjemplo = [
  {
    id: 1,
    fecha: "2025-06-01",
    tipo: "Servicio",
    items: [
      { nombre: "Instalación de red", cantidad: 1, total: 120 },
      { nombre: "Configuración de router", cantidad: 1, total: 120 }
    ]
  },
  {
    id: 2,
    fecha: "2025-06-10",
    tipo: "Producto",
    items: [
      { nombre: "Router TP-Link", cantidad: 2, total: 400 },
      { nombre: "Cable Ethernet 10m", cantidad: 2, total: 200 }
    ]
  }
];

export default function HistorialVentasEmpresa({ idEmpresa, onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Historial de Ventas – Empresa #{idEmpresa}</h3>
          <button onClick={onClose} className="text-red-500 text-lg hover:text-red-600">
            <FiX />
          </button>
        </div>

        {/* Tabla general de ventas */}
        <div className="space-y-4">
          {historialEjemplo.map((venta) => (
            <div key={venta.id} className="border rounded-md p-3 shadow-sm bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Venta #{venta.id} – {venta.fecha}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    {venta.tipo === "Producto" ? <FiPackage /> : <FiSettings />}
                    {venta.tipo}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-700">
                  Total:{" "}
                  <strong>
                    S/{" "}
                    {venta.items.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Detalle de items */}
              <table className="tabla-empresas">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {venta.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>S/ {item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Botón cerrar */}
        <div className="modal-botones mt-6">
          <button type="button" onClick={onClose} className="boton-form gris">
            <FiX className="mr-1" />
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
