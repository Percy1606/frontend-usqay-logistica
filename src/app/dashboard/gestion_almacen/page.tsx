// === page.tsx ===
"use client";

import { useState } from "react";
import AlertaStock from "../../components/almacen/AlertaStock";
import EntradasSalidas from "../../components/almacen/EntradasSalidas";
import KardexHistorial from "../../components/almacen/KardexHistorial";
import ReporteAlmacen from "../../components/almacen/ReporteAlmacen";
import "../../../styles/almacen.css";

export default function GestionAlmacenPage() {
  const [vistaActiva, setVistaActiva] = useState<"alerta" | "movimientos" | "kardex" | "reporte">("alerta");

  return (
    <main className="ventas-layout">
      <div className="ventas-container">
        <header className="ventas-header mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🏬 Gestión de Almacén</h1>
          <p className="text-sm text-gray-500">Control de stock, movimientos y monitoreo.</p>
        </header>

        <nav className="tabs-bar">
          <button className={`tab-button ${vistaActiva === "alerta" ? "tab-active" : ""}`} onClick={() => setVistaActiva("alerta")}>🚨 Alerta de Stock</button>
          <button className={`tab-button ${vistaActiva === "movimientos" ? "tab-active" : ""}`} onClick={() => setVistaActiva("movimientos")}>🔄 Entradas/Salidas</button>
          <button className={`tab-button ${vistaActiva === "kardex" ? "tab-active" : ""}`} onClick={() => setVistaActiva("kardex")}>📜 Kardex</button>
          <button className={`tab-button ${vistaActiva === "reporte" ? "tab-active" : ""}`} onClick={() => setVistaActiva("reporte")}>📊 Reporte</button>
        </nav>

        <section>
          {vistaActiva === "alerta" && <AlertaStock />}
          {vistaActiva === "movimientos" && <EntradasSalidas />}
          {vistaActiva === "kardex" && <KardexHistorial />}
          {vistaActiva === "reporte" && <ReporteAlmacen />}
        </section>
      </div>
    </main>
  );
}
