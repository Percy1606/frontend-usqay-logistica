'use client';
import React, { useState, useEffect } from 'react';

interface Cliente {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
}

interface Props {
  cliente?: Cliente | null;
  onGuardar: (cliente: Cliente) => void;
  onCerrar: () => void;
}

export default function FormularioClienteModal({ cliente, onGuardar, onCerrar }: Props) {
  const [form, setForm] = useState<Cliente>({ nombre: '', correo: '', telefono: '' });

  useEffect(() => {
    if (cliente) setForm(cliente);
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onGuardar({ ...form, id: cliente?.id ?? Date.now() });
    onCerrar();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="text-lg font-bold text-indigo-700 mb-4">
          {cliente ? '✏️ Editar Cliente' : '➕ Nuevo Cliente'}
        </h2>
        <div className="space-y-3">
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="input input-bordered w-full" />
          <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="input input-bordered w-full" />
          <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        <div className="modal-actions mt-5 flex justify-end gap-3">
          <button className="btn btn-primary" onClick={handleSubmit}>💾 Guardar</button>
          <button className="btn btn-secondary" onClick={onCerrar}>❌ Cancelar</button>
        </div>
      </div>
    </div>
  );
}
