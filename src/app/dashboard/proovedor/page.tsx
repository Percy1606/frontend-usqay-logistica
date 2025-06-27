"use client";
import { useState } from "react";
import ProveedorForm from "../../components/proveedor/ProveedorForm";
import ProveedorTable from "../../components/proveedor/ProveedorTable";
import "../../../styles/proveedor.css";

export interface Proveedor {
  idProveedor: number;
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  paginaWeb: string;
  email: string;
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    {
      idProveedor: 1,
      ruc: "20548796321",
      razonSocial: "TechWorld S.A.C.",
      direccion: "Av. Tecnología 101, Lima",
      telefono: "987654321",
      paginaWeb: "https://techworld.pe",
      email: "ventas@techworld.pe",
    },
    {
      idProveedor: 2,
      ruc: "20147823567",
      razonSocial: "Innovatek Perú EIRL",
      direccion: "Calle Circuito 505, Arequipa",
      telefono: "945789321",
      paginaWeb: "https://innovatek.com",
      email: "contacto@innovatek.com",
    },
    {
      idProveedor: 3,
      ruc: "20659874123",
      razonSocial: "Sistemas Globales SAC",
      direccion: "Jr. Mainboard 333, Piura",
      telefono: "923456789",
      paginaWeb: "https://sistemasglobales.pe",
      email: "soporte@sistemasglobales.pe",
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);

  const agregarProveedor = (nuevo: Omit<Proveedor, "idProveedor">) => {
    const nuevoProveedor: Proveedor = {
      idProveedor: proveedores.length > 0
        ? Math.max(...proveedores.map(p => p.idProveedor)) + 1
        : 1,
      ...nuevo,
    };
    setProveedores([...proveedores, nuevoProveedor]);
    setModalAbierto(false);
  };

  const eliminarProveedor = (id: number) => {
    setProveedores(proveedores.filter((p) => p.idProveedor !== id));
  };

  const editarProveedor = (id: number, actualizado: Omit<Proveedor, "idProveedor">) => {
    setProveedores(
      proveedores.map((p) =>
        p.idProveedor === id ? { ...p, ...actualizado } : p
      )
    );
  };

  return (
    <div className="empresas-container">
      <div className="encabezado-seccion">
        <h1 className="titulo-principal">Administrar Proveedores</h1>
        <button className="boton-nuevo" onClick={() => setModalAbierto(true)}>
          + Nuevo Proveedor
        </button>
      </div>

      <ProveedorTable
        proveedores={proveedores}
        onEliminar={eliminarProveedor}
        onEditar={editarProveedor}
      />

      {/* ---------- MODAL ---------- */}
      {modalAbierto && (
        <div className="modal-backdrop" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-titulo">Registrar Proveedor</h2>
              <button className="modal-close" onClick={() => setModalAbierto(false)}>
                &times;
              </button>
            </div>

            <ProveedorForm
              onAgregar={agregarProveedor}
              onCancelar={() => setModalAbierto(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
