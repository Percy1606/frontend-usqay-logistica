'use client';

import React, { useState, useMemo } from 'react';
import VentasTable from '../../components/ventas/VentasTable';
import VentaRegistroModal from '../../components/ventas/VentaRegistroModal';
import VentasFiltro from '../../components/ventas/VentasFiltro';
import ResumenVentasModal from '../../components/ventas/ResumenVentasModal';
import '../../../styles/venta.css';
import { useVentas } from '../../../hooks/useVentas';

const GestionVentasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reporteAbierto, setReporteAbierto] = useState(false);

  const filtrosIniciales = {
    cliente: '',
    fechaInicio: '',
    fechaFin: '',
  };

  const [filtros, setFiltros] = useState(filtrosIniciales);
  const { ventas } = useVentas();

  const limpiarFiltros = () => setFiltros(filtrosIniciales);

  const ventasFiltradas = useMemo(() => {
    return ventas.filter((v) => {
      if (!v?.cliente?.nombre || !v.fechaRegistro) return false;

      const clienteOK = v.cliente.nombre
        .toLowerCase()
        .includes(filtros.cliente.toLowerCase());

      const fechaVenta = new Date(v.fechaRegistro).getTime();
      const desde = filtros.fechaInicio ? new Date(filtros.fechaInicio).getTime() : null;
      const hasta = filtros.fechaFin ? new Date(filtros.fechaFin).getTime() : null;
      const fechaOK = (!desde || fechaVenta >= desde) && (!hasta || fechaVenta <= hasta);

      return clienteOK && fechaOK;
    });
  }, [ventas, filtros]);

  const totalVentas = ventasFiltradas.length;
  const totalIngresos = ventasFiltradas.reduce((acc, v) => acc + v.costoTotal, 0);
  const totalServicios = ventasFiltradas.reduce((acc, v) => acc + v.detalles.length, 0);
  const totalProductos = ventasFiltradas.reduce(
    (acc, v) => acc + (v.productos?.reduce((sum, p) => sum + p.cantidad, 0) || 0),
    0
  );
  const totalDescuentos = ventasFiltradas.reduce((acc, v) => acc + v.descuento, 0);

  return (
    <main className="ventas-layout">
      <div className="ventas-container">

        {/* Encabezado */}
        <header className="ventas-header mb-6 relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📊 Gestión de Ventas</h1>
            <p className="text-sm text-gray-500">
              Consulta el historial y registra nuevas ventas de servicios y productos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="modal-trigger-btn add"
            >
              ➕ Registrar Venta
            </button>
            <button
              onClick={limpiarFiltros}
              className="modal-trigger-btn view"
            >
              🧹 Limpiar Filtros
            </button>
            <button
              onClick={() => setReporteAbierto(true)}
              className="modal-trigger-btn report"
            >
              📄 Ver Reporte
            </button>
          </div>
        </header>

        {/* Filtros */}
        <section className="mb-6">
          <VentasFiltro filtros={filtros} onFiltroChange={setFiltros} />
        </section>

        {/* Tabla */}
        <section className="ventas-section">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Historial de Ventas</h2>
          <VentasTable ventas={ventasFiltradas ?? []} />
        </section>
      </div>

      {/* Modal de Registro */}
      <VentaRegistroModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Modal de Reporte */}
      <ResumenVentasModal
        open={reporteAbierto}
        onClose={() => setReporteAbierto(false)}
        totalVentas={totalVentas}
        totalIngresos={totalIngresos}
        totalServicios={totalServicios}
        totalProductos={totalProductos}
        totalDescuentos={totalDescuentos}
      />
    </main>
  );
};

export default GestionVentasPage;
