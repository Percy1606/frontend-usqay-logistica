"use client";

import { useState, useMemo } from "react";
import { Download, Trash2, Plus } from "lucide-react";

interface Movimiento {
  producto: string;
  cantidad: number;
  tipo: "entrada" | "salida";
  fecha: string;
}

export default function EntradasSalidas() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [tipoMovimiento, setTipoMovimiento] = useState<"entrada" | "salida">("entrada");
  const [fecha, setFecha] = useState("");
  const [filtro, setFiltro] = useState("");
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const [historial, setHistorial] = useState<Movimiento[]>([
    { producto: "Switch 8P", cantidad: 5, tipo: "entrada", fecha: "2025-06-10" },
    { producto: "Access Point", cantidad: 2, tipo: "salida", fecha: "2025-06-11" },
    { producto: "Router Mikrotik", cantidad: 4, tipo: "entrada", fecha: "2025-06-12" },
    { producto: "Laptop HP EliteBook", cantidad: 1, tipo: "salida", fecha: "2025-06-13" },
    { producto: "Cable UTP 30m", cantidad: 8, tipo: "entrada", fecha: "2025-06-14" },
  ]);

  const handleGuardar = () => {
    if (!producto || cantidad <= 0 || !fecha) {
      setError("Completa todos los campos correctamente.");
      return;
    }

    const nuevo: Movimiento = { producto, cantidad, tipo: tipoMovimiento, fecha };
    setHistorial([...historial, nuevo]);
    setProducto("");
    setCantidad(0);
    setTipoMovimiento("entrada");
    setFecha("");
    setError("");
    setMostrarModal(false);
  };

  const handleEliminar = (index: number) => {
    const confirmar = window.confirm("¿Eliminar este movimiento?");
    if (confirmar) {
      setHistorial(historial.filter((_, i) => i !== index));
    }
  };

  const exportarCSV = () => {
    const encabezado = "Producto,Cantidad,Tipo,Fecha";
    const filas = historial.map((m) => `${m.producto},${m.cantidad},${m.tipo},${m.fecha}`);
    const contenido = [encabezado, ...filas].join("\n");
    const blob = new Blob([contenido], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "movimientos_almacen.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const movimientosFiltrados = useMemo(
    () =>
      historial.filter(
        (m) =>
          m.producto.toLowerCase().includes(filtro.toLowerCase()) ||
          m.tipo.toLowerCase().includes(filtro.toLowerCase())
      ),
    [historial, filtro]
  );

  const totalEntradas = historial
    .filter((m) => m.tipo === "entrada")
    .reduce((sum, m) => sum + m.cantidad, 0);

  const totalSalidas = historial
    .filter((m) => m.tipo === "salida")
    .reduce((sum, m) => sum + m.cantidad, 0);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📦 Registro de Entradas y Salidas</h2>
        {historial.length > 0 && (
          <button onClick={exportarCSV} className="flex items-center gap-2">
            <Download size={16} /> Exportar CSV
          </button>
        )}
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={() => setMostrarModal(true)} className="flex items-center gap-2">
          <Plus size={16} /> Registrar Movimiento
        </button>
      </div>

      {historial.length > 0 && (
        <>
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="🔍 Buscar por producto o tipo..."
            className="mb-4 w-full"
          />

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {movimientosFiltrados.map((m, i) => (
                  <tr key={i}>
                    <td>{m.producto}</td>
                    <td>{m.cantidad}</td>
                    <td>
                      <span className={`badge-stock ${m.tipo === "entrada" ? "badge-verde" : "badge-rojo"}`}>
                        {m.tipo === "entrada" ? "Entrada" : "Salida"}
                      </span>
                    </td>
                    <td>{m.fecha}</td>
                    <td>
                      <button onClick={() => handleEliminar(i)} title="Eliminar">
                        <Trash2 size={16} className="text-red-600 hover:text-red-800" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <strong>Total Entradas:</strong> {totalEntradas} &nbsp;|&nbsp;
            <strong>Total Salidas:</strong> {totalSalidas}
          </div>
        </>
      )}

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-semibold mb-4">➕ Registrar Movimiento</h3>

            <div className="grid">
              <div>
                <label className="filtro-label">Producto</label>
                <input
                  type="text"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  placeholder="Ej: Access Point"
                />
              </div>

              <div>
                <label className="filtro-label">Cantidad</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  min={1}
                />
              </div>

              <div>
                <label className="filtro-label">Tipo</label>
                <select
                  value={tipoMovimiento}
                  onChange={(e) => setTipoMovimiento(e.target.value as "entrada" | "salida")}
                >
                  <option value="entrada">Entrada</option>
                  <option value="salida">Salida</option>
                </select>
              </div>

              <div>
                <label className="filtro-label">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <div className="flex justify-end gap-3 mt-4">
              <button className="cancelar-btn" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
              <button className="guardar-btn" onClick={handleGuardar}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
