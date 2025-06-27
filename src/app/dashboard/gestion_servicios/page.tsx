'use client'

import React, { useState } from 'react'
import ServicesTable from '../../components/servicios/ServicesTable'
import ModalRegistroServicio from '../../components/servicios/ModalRegistroServicio'
import useGestionServicios from '../../../features/useGestionServicios'
import '../../../styles/servicios.css'

export default function GestionServiciosPage() {
  const {
    searchTerm,
    setSearchTerm,
    ventasRegistradas,
    registrarVenta,
    exportToCSV
  } = useGestionServicios()

  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-semibold mb-6">🔧 Historial de Servicios</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          placeholder="🔍 Buscar por cliente..."
        />
        <button
          className="primary-btn"
          onClick={() => setMostrarModal(true)}
        >
          📝 Registrar Servicio
        </button>
      </div>

      <section className="box-white">
        <ServicesTable
          ventas={ventasRegistradas}
          searchTerm={searchTerm}
          onExport={exportToCSV}
        />
      </section>

      {mostrarModal && (
        <ModalRegistroServicio
          onClose={() => setMostrarModal(false)}
          onRegistrar={(venta) => {
            registrarVenta(venta)
            setMostrarModal(false)
          }}
        />
      )}
    </div>
  )
}
