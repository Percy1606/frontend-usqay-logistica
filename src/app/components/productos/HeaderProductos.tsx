'use client'
import React from 'react'
import { FaDesktop, FaFileExport, FaPlus } from 'react-icons/fa'

interface HeaderProps {
  total: number
  onNuevoProductoClick: () => void
  onExportarClick: () => void // Agregado para la funcionalidad de exportar
}

export default function HeaderProductos({ total, onNuevoProductoClick, onExportarClick }: HeaderProps) {
  return (
    <div className="dashboard-header">
      <div className="header-title">
        <FaDesktop className="header-icon" />
        <h1>Gestión de Productos</h1>
        <span className="badge">{total} productos</span>
      </div>
      <div className="header-actions">
        <button className="export-btn" onClick={onExportarClick}>
          <FaFileExport /> Exportar
        </button>
        <button className="primary-btn" onClick={onNuevoProductoClick}>
          <FaPlus /> Nuevo Producto
        </button>
      </div>
    </div>
  )
}
