"use client";

import { useState, useMemo } from "react";
import { Calendar, Filter, Download } from "lucide-react";

interface Movimiento {
  id: number;
  producto: string;
  tipo: "entrada" | "salida";
  cantidad: number;
  fecha: string;
}

const movimientosIniciales: Movimiento[] = [
  { id: 1, tipo: "entrada", producto: "Switch 8P", cantidad: 10, fecha: "2024-05-01" },
  { id: 2, tipo: "salida", producto: "Switch 8P", cantidad: 2, fecha: "2024-05-03" },
  { id: 3, tipo: "entrada", producto: "Access Point", cantidad: 5, fecha: "2024-05-04" },
  { id: 4, tipo: "salida", producto: "Access Point", cantidad: 1, fecha: "2024-05-06" },
];

export default function KardexHistorial() {
  const [filtroTexto, setFiltroTexto] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState<"todos" | "entrada" | "salida">("todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const resultados = useMemo(() => {
    return movimientosIniciales
      .filter(m =>
        m.producto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
        (tipoFiltro === "todos" || m.tipo === tipoFiltro) &&
        (!desde || new Date(m.fecha) >= new Date(desde)) &&
        (!hasta || new Date(m.fecha) <= new Date(hasta))
      )
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }, [filtroTexto, tipoFiltro, desde, hasta]);

  const exportarCSV = () => {
    const encabezado = "Fecha,Producto,Tipo,Cantidad";
    const filas = resultados.map(
      (m) => `${m.fecha},${m.producto},${m.tipo},${m.cantidad}`
    );
    const contenido = [encabezado, ...filas].join("\n");
    const blob = new Blob([contenido], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kardex_historial.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  let stockAcumulado = 0;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Filter size={20} /> Kardex / Historial de Movimientos
        </h2>
        {resultados.length > 0 && (
          <button onClick={exportarCSV} className="flex items-center gap-2">
            <Download size={16} /> Exportar CSV
          </button>
        )}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <input
          type="text"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          placeholder="🔍 Buscar producto..."
        />

        <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value as any)}>
          <option value="todos">Todos</option>
          <option value="entrada">Entradas</option>
          <option value="salida">Salidas</option>
        </select>

        <div>
          <label className="filtro-label flex items-center gap-2"><Calendar size={16} /> Desde</label>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        </div>

        <div>
          <label className="filtro-label flex items-center gap-2"><Calendar size={16} /> Hasta</label>
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((m) => {
              stockAcumulado += m.tipo === "entrada" ? m.cantidad : -m.cantidad;
              return (
                <tr key={m.id}>
                  <td>{m.fecha}</td>
                  <td>{m.producto}</td>
                  <td>
                    <span className={`badge-stock ${m.tipo === "entrada" ? "badge-verde" : "badge-rojo"}`}>
                      {m.tipo}
                    </span>
                  </td>
                  <td>{m.cantidad}</td>
                  <td style={{ fontWeight: "bold", color: stockAcumulado < 0 ? "red" : "black" }}>
                    {stockAcumulado}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
