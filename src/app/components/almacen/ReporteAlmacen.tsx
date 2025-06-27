"use client";

import {
  Calendar,
  BarChart2,
  Download,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Movimiento {
  producto: string;
  cantidad: number;
  tipo: "entrada" | "salida";
  fecha: string;
}

export default function ReporteAlmacen() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [anio, setAnio] = useState("2025");
  const [mes, setMes] = useState("06");
  const [tipoGrafico, setTipoGrafico] = useState<"bar" | "line">("bar");

  useEffect(() => {
    const datos: Movimiento[] = [
      { producto: "Laptop", cantidad: 5, tipo: "entrada", fecha: "2025-06-10" },
      { producto: "Laptop", cantidad: 3, tipo: "salida", fecha: "2025-06-10" },
      { producto: "Router", cantidad: 2, tipo: "entrada", fecha: "2025-06-11" },
      { producto: "Router", cantidad: 1, tipo: "salida", fecha: "2025-06-11" },
      { producto: "Laptop", cantidad: 4, tipo: "salida", fecha: "2025-06-12" },
      { producto: "Router", cantidad: 5, tipo: "entrada", fecha: "2025-06-12" },
    ];
    setMovimientos(datos);
  }, []);

  const movimientosFiltrados = useMemo(() => {
    return movimientos.filter((m) => {
      const fecha = new Date(m.fecha);
      return (
        fecha.getFullYear().toString() === anio &&
        (fecha.getMonth() + 1).toString().padStart(2, "0") === mes
      );
    });
  }, [movimientos, anio, mes]);

  const fechasUnicas = useMemo(() => {
    const fechas = new Set(movimientosFiltrados.map((m) => m.fecha));
    return Array.from(fechas).sort();
  }, [movimientosFiltrados]);

  const dataAgrupada = useMemo(() => {
    const agrupado: Record<string, { entrada: number; salida: number }> = {};
    fechasUnicas.forEach((f) => {
      agrupado[f] = { entrada: 0, salida: 0 };
    });
    movimientosFiltrados.forEach((m) => {
      agrupado[m.fecha][m.tipo] += m.cantidad;
    });
    return agrupado;
  }, [fechasUnicas, movimientosFiltrados]);

  const chartData = {
    labels: fechasUnicas,
    datasets: [
      {
        label: "Entradas",
        data: fechasUnicas.map((f) => dataAgrupada[f].entrada),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Salidas",
        data: fechasUnicas.map((f) => dataAgrupada[f].salida),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const exportarCSV = () => {
    const csv = `Fecha,Entradas,Salidas\n` +
      fechasUnicas
        .map((f) => `${f},${dataAgrupada[f].entrada},${dataAgrupada[f].salida}`)
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_almacen.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const limpiarFiltros = () => {
    setAnio("2025");
    setMes("06");
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart2 size={22} /> Reporte de Almacén
        </h2>
        <button
          onClick={exportarCSV}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md font-medium"
        >
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Año</label>
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="w-[120px] px-3 py-2 border rounded-md bg-gray-50"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Mes</label>
          <select
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="w-[160px] px-3 py-2 border rounded-md bg-gray-50"
          >
            {[
              "01", "02", "03", "04", "05", "06",
              "07", "08", "09", "10", "11", "12",
            ].map((m, i) => (
              <option key={m} value={m}>
                {new Date(0, i).toLocaleString("es-ES", {
                  month: "long",
                }).toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {}}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
        >
          🔍 Buscar
        </button>

        <button
          onClick={limpiarFiltros}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
        >
          <RefreshCcw size={16} /> Limpiar Filtros
        </button>

        <select
          value={tipoGrafico}
          onChange={(e) => setTipoGrafico(e.target.value as "bar" | "line")}
          className="p-2 border rounded-md"
        >
          <option value="bar">Barras</option>
          <option value="line">Líneas</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm mt-4">
        {tipoGrafico === "bar" ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Movimientos de Almacén por Día",
                },
              },
            }}
          />
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Movimientos de Almacén por Día",
                },
              },
            }}
          />
        )}
      </div>
    </section>
  );
}
