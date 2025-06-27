"use client";

import { useMemo, useState } from "react";

export default function AlertaStock() {
  const [productos] = useState([
    { nombre: "Switch 8P", stock: 2, minimo: 5 },
    { nombre: "Router Mikrotik", stock: 10, minimo: 3 },
    { nombre: "Access Point", stock: 1, minimo: 4 },
    { nombre: "Cable UTP 30m", stock: 6, minimo: 6 },
    { nombre: "Laptop Lenovo ThinkPad", stock: 7, minimo: 10 },
    { nombre: "Laptop HP EliteBook", stock: 12, minimo: 10 },
    { nombre: "Monitor Samsung 24\"", stock: 3, minimo: 5 },
    { nombre: "Teclado Mecánico Redragon", stock: 20, minimo: 8 },
    { nombre: "Mouse Logitech", stock: 5, minimo: 6 },
    { nombre: "Impresora Epson EcoTank", stock: 1, minimo: 2 },
    { nombre: "Disco SSD 1TB", stock: 0, minimo: 5 },
    { nombre: "Memoria RAM 8GB DDR4", stock: 8, minimo: 8 },
    { nombre: "Licencia Windows 11 Pro", stock: 25, minimo: 15 },
    { nombre: "Cámara Web Logitech C920", stock: 2, minimo: 4 },
    { nombre: "Tablet Samsung Galaxy Tab", stock: 4, minimo: 5 },
    { nombre: "Smartphone Xiaomi Redmi Note 12", stock: 9, minimo: 12 },
    { nombre: "Proyector BenQ Full HD", stock: 2, minimo: 2 },
    { nombre: "UPS APC 1200VA", stock: 0, minimo: 2 },
  ]);

  const productosEnAlerta = useMemo(
    () => productos.filter((p) => p.stock < p.minimo),
    [productos]
  );

  const exportarCSV = () => {
    const filas = productosEnAlerta.map((p) => `${p.nombre},${p.stock},${p.minimo}`).join("\n");
    const contenido = `Producto,Stock Actual,Stock Mínimo\n${filas}`;
    const blob = new Blob([contenido], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "alerta_stock.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getBadge = (stock: number) => {
    if (stock === 0) return <span className="badge-stock badge-rojo">Agotado</span>;
    if (stock < 3) return <span className="badge-stock badge-amarilla">Crítico</span>;
    return <span className="badge-stock badge-naranja">Bajo Stock</span>;
  };

  return (
    <section>
      {/* Encabezado con botón Exportar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">📦 Alerta de Bajo Stock</h2>

        {productosEnAlerta.length > 0 && (
          <button onClick={exportarCSV} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            📥 Exportar CSV
          </button>
        )}
      </div>

      {/* Mensaje si no hay productos en alerta */}
      {productosEnAlerta.length === 0 ? (
        <p className="badge-stock badge-verde">✅ Todo bien. No hay productos con bajo stock.</p>
      ) : (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productosEnAlerta.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td>
                    <span className="text-red-600 font-bold">{p.stock}</span>
                  </td>
                  <td>{p.minimo}</td>
                  <td>{getBadge(p.stock)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

