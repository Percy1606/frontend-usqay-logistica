"use client";
import { FiX, FiSend, FiFileText, FiCheckCircle } from "react-icons/fi";

interface Props {
  idEmpresa: number;
  razonSocial?: string;
  onClose: () => void;
}

export default function ComprobanteForm({ idEmpresa, razonSocial, onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        {/* Encabezado del modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FiFileText />
            Emitir Comprobante
          </h3>
          <button
            onClick={onClose}
            className="text-red-500 text-lg hover:text-red-600"
            aria-label="Cerrar modal"
          >
            <FiX />
          </button>
        </div>

        {/* Información de la empresa */}
        <p className="text-sm mb-4 text-gray-600">
          Para <strong>#{idEmpresa}</strong>
          {razonSocial ? ` – ${razonSocial}` : ""}
        </p>

        {/* Formulario de emisión */}
        <form>
          <label>Tipo de Comprobante</label>
          <select>
            <option value="boleta">Boleta</option>
            <option value="factura">Factura</option>
          </select>

          <label>Importe Total</label>
          <input type="number" placeholder="Ej: 120.50" />

          <label>Descripción</label>
          <textarea rows={3} placeholder="Detalle de la venta o servicio" />

          {/* Botones */}
          <div className="modal-botones">
            <button type="submit" className="boton-form negro">
              <FiCheckCircle className="mr-1" />
              Emitir
            </button>
            <button type="button" onClick={onClose} className="boton-form gris">
              <FiX className="mr-1" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
