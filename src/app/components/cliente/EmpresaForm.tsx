// Archivo: src/app/components/cliente/EmpresaForm.tsx
"use client";
import { FiPlus } from "react-icons/fi";

export default function EmpresaForm() {
  return (
    <div className="seccion-empresa-nueva">
      <h2 className="subtitulo flex items-center gap-2">
        <FiPlus className="icono" />
        Registrar Nuevo Restaurante
      </h2>

      <form className="formulario-empresa">
        <div className="campo-formulario">
          <label>Razón Social</label>
          <input type="text" placeholder="Ej: Mi Restaurante SAC" />
        </div>

        <div className="campo-formulario">
          <label>Representante Legal</label>
          <input type="text" placeholder="Nombre completo del responsable legal" />
        </div>

        <div className="campo-formulario">
          <label>Teléfono</label>
          <input type="tel" placeholder="Ej: 987654321" />
        </div>

        <div className="campo-formulario">
          <label>Correo Electrónico</label>
          <input type="email" placeholder="Ej: contacto@empresa.com" />
        </div>

        <div className="campo-formulario">
          <label>RUC</label>
          <input type="text" maxLength={11} placeholder="11 dígitos del RUC" />
        </div>

        <div className="campo-formulario">
          <label>Clave SOL</label>
          <input type="password" placeholder="Clave SUNAT - SOL" />
        </div>

        <div className="campo-formulario">
          <label>Certificado Digital</label>
          <input type="file" />
        </div>

        <div className="campo-formulario">
          <label>Clave Certificado</label>
          <input type="password" placeholder="Contraseña del certificado digital" />
        </div>

        <div className="campo-formulario" style={{ gridColumn: 'span 2' }}>
          <label>Dirección</label>
          <textarea rows={3} placeholder="Dirección completa (ej. Av. Principal 123, Lima)"></textarea>
        </div>

        <div className="botones-formulario">
          <button type="submit" className="boton-form negro">
            <FiPlus className="mr-1" />
            Registrar
          </button>
          <button type="reset" className="boton-form gris">Limpiar</button>
        </div>
      </form>
    </div>
  );
}
