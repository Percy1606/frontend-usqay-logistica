"use client";
import { useState } from "react";
import {
  FiHome,
  FiUser,
  FiPhone,
  FiMail,
  FiEdit2,
  FiTrash2,
  FiFileText,
  FiPlus
} from "react-icons/fi";
import HistorialVentasEmpresa from "./HistorialVentasEmpresa";
import ComprobanteForm from "./ComprobanteForm";

const empresasIniciales = [
  {
    IdEmpresa: 1,
    RazonSocial: "La Mar Restaurante SAC",
    RepresentanteLegal: "Juan Pérez Gómez",
    Telefono: "987654321",
    Correo: "contacto@lamar.com",
    Ruc: "20123456789",
    Estado: "Activo",
    ClaveSol: "CLAVE123"
  },
  {
    IdEmpresa: 2,
    RazonSocial: "El Rincón del Chef EIRL",
    RepresentanteLegal: "María García López",
    Telefono: "987654322",
    Correo: "info@rinconchef.com",
    Ruc: "20123456780",
    Estado: "Activo",
    ClaveSol: "CLAVE456"
  }
];

export default function EmpresaTable() {
  const [empresas, setEmpresas] = useState(empresasIniciales);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<number | null>(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarComprobante, setMostrarComprobante] = useState(false);

  const handleVerVentas = (id: number) => {
    setEmpresaSeleccionada(id);
    setMostrarHistorial(true);
  };

  const handleFacturar = (id: number) => {
    setEmpresaSeleccionada(id);
    setMostrarComprobante(true);
  };

  return (
    <>
      <h2 className="subtitulo flex items-center gap-2">
        <FiHome className="icono" />
        Restaurantes Registrados
      </h2>

      <table className="tabla-empresas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Razón Social</th>
            <th>Representante</th>
            <th>Contacto</th>
            <th>RUC</th>
            <th>Clave SOL</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.IdEmpresa}>
              <td>{empresa.IdEmpresa}</td>
              <td className="flex items-center gap-2">
                <FiHome className="icono" />
                {empresa.RazonSocial}
              </td>
              <td className="flex items-center gap-2">
                <FiUser className="icono" />
                {empresa.RepresentanteLegal}
              </td>
              <td>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FiPhone className="icono" />
                    {empresa.Telefono}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMail className="icono" />
                    {empresa.Correo}
                  </div>
                </div>
              </td>
              <td>{empresa.Ruc}</td>
              <td>{empresa.ClaveSol}</td>
              <td>
                <span className={`badge ${empresa.Estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                  {empresa.Estado}
                </span>
              </td>
              <td className="flex flex-col gap-2 min-w-[120px]">
                <button onClick={() => handleVerVentas(empresa.IdEmpresa)} className="boton-accion boton-editar">
                  <FiFileText className="icono" />
                  Ver Ventas
                </button>
                <button onClick={() => handleFacturar(empresa.IdEmpresa)} className="boton-accion boton-agregar">
                  <FiFileText className="icono" />
                  Facturar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarHistorial && empresaSeleccionada !== null && (
        <HistorialVentasEmpresa idEmpresa={empresaSeleccionada} onClose={() => setMostrarHistorial(false)} />
      )}

      {mostrarComprobante && empresaSeleccionada !== null && (
        <ComprobanteForm idEmpresa={empresaSeleccionada} onClose={() => setMostrarComprobante(false)} />
      )}
    </>
  );
}