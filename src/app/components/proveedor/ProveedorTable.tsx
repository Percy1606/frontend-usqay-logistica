"use client";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";

export interface Proveedor {
  idProveedor: number;
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  paginaWeb: string;
  email: string;
}

interface Props {
  proveedores: Proveedor[];
  onEliminar: (id: number) => void;
  onEditar: (id: number, proveedor: Omit<Proveedor, "idProveedor">) => void;
}

export default function ProveedorTable({
  proveedores,
  onEliminar,
  onEditar,
}: Props) {
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Proveedor, "idProveedor">>({
    ruc: "",
    razonSocial: "",
    direccion: "",
    telefono: "",
    paginaWeb: "",
    email: "",
  });

  const comenzarEdicion = (proveedor: Proveedor) => {
    setEditandoId(proveedor.idProveedor);
    const { idProveedor, ...resto } = proveedor;
    setFormData(resto);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({
      ruc: "",
      razonSocial: "",
      direccion: "",
      telefono: "",
      paginaWeb: "",
      email: "",
    });
  };

  const guardarCambios = () => {
    if (editandoId !== null) {
      onEditar(editandoId, formData);
      cancelarEdicion();
    }
  };

  const renderInput = (
    campo: keyof Omit<Proveedor, "idProveedor">,
    valorActual: string,
    placeholder: string
  ) => (
    <input
      value={formData[campo]}
      onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })}
      placeholder={placeholder}
      className="input-tabla"
    />
  );

  return (
    <div>
      <h2 className="subtitulo">
        <FiPackage /> Lista de Proveedores
      </h2>
      <table className="tabla-empresas">
        <thead>
          <tr>
            <th>N° RUC</th>
            <th>Razón Social</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Página Web</th>
            <th>E-Mail</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((p) => (
            <tr key={p.idProveedor}>
              <td>
                {editandoId === p.idProveedor
                  ? renderInput("ruc", p.ruc, "Ingrese RUC del Proveedor")
                  : p.ruc}
              </td>
              <td>
                {editandoId === p.idProveedor
                  ? renderInput("razonSocial", p.razonSocial, "Ingrese Razón Social")
                  : p.razonSocial}
              </td>
              <td>
                {editandoId === p.idProveedor
                  ? renderInput("direccion", p.direccion, "Ingrese Dirección")
                  : p.direccion}
              </td>
              <td>
                {editandoId === p.idProveedor
                  ? renderInput("telefono", p.telefono, "Ingrese Teléfono")
                  : p.telefono}
              </td>
              <td>
                {editandoId === p.idProveedor
                  ? renderInput("paginaWeb", p.paginaWeb, "Ingrese Página Web")
                  : p.paginaWeb}
              </td>
              <td>
                {editandoId === p.idProveedor
                  ? renderInput("email", p.email, "Ingrese Email")
                  : p.email}
              </td>
              <td className="flex gap-2">
                {editandoId === p.idProveedor ? (
                  <>
                    <button onClick={guardarCambios} className="boton-accion boton-agregar">
                      Guardar
                    </button>
                    <button onClick={cancelarEdicion} className="boton-accion boton-cancelar">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => comenzarEdicion(p)} className="boton-accion boton-editar">
                      <FiEdit2 /> Editar
                    </button>
                    <button onClick={() => onEliminar(p.idProveedor)} className="boton-accion boton-eliminar">
                      <FiTrash2 /> Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
