"use client";
import { useState } from "react";
import { Proveedor } from "../../dashboard/proovedor/page";
import { FiPlus, FiX } from "react-icons/fi";

interface Props {
  onAgregar: (proveedor: Omit<Proveedor, "idProveedor">) => void;
  onCancelar: () => void;
}

export default function ProveedorForm({ onAgregar, onCancelar }: Props) {
  const [formData, setFormData] = useState<Omit<Proveedor, "idProveedor">>({
    ruc: "",
    razonSocial: "",
    direccion: "",
    telefono: "",
    paginaWeb: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ruc || !formData.razonSocial) return;
    onAgregar(formData);
  };

  const campos = [
    { name: "ruc", label: "N° RUC", placeholder: "Ingrese RUC del Proveedor" },
    { name: "razonSocial", label: "Razón Social", placeholder: "Ingrese Razón Social del Proveedor" },
    { name: "direccion", label: "Dirección", placeholder: "Ingrese Dirección del Proveedor" },
    { name: "telefono", label: "Teléfono", placeholder: "Ingrese Teléfono del Proveedor" },
    { name: "paginaWeb", label: "Página Web", placeholder: "Ingrese Página Web del Proveedor" },
    { name: "email", label: "E-Mail", placeholder: "Ingrese Email del Proveedor" },
  ];

  return (
    <form className="formulario-empresa" onSubmit={handleSubmit}>
      {campos.map(({ name, label, placeholder }) => (
        <div className="campo-formulario" key={name}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            value={(formData as any)[name]}
            onChange={handleChange}
            required={name === "ruc" || name === "razonSocial"}
          />
        </div>
      ))}

      <div className="botones-formulario">
        <button type="submit" className="boton-form negro">
          <FiPlus /> Guardar
        </button>
        <button type="button" onClick={onCancelar} className="boton-form gris">
          <FiX /> Cerrar
        </button>
      </div>
    </form>
  );
}
