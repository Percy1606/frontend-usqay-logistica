'use client'
import React from 'react'

interface Props {
  filters: {
    startDate: string
    endDate: string
    technician: string
    client: string
  }
  setFilters: (filters: Props['filters']) => void
  technicianOptions: { idUsuario: number; nombre: string }[]
}

export default function ReportFilters({ filters, setFilters, technicianOptions }: Props) {
  const handleChange = (field: keyof Props['filters'], value: string) => {
    setFilters({ ...filters, [field]: value })
  }

  return (
    <div className="filter-group">
      <input
        type="date"
        className="search-input"
        value={filters.startDate}
        onChange={(e) => handleChange('startDate', e.target.value)}
      />
      <input
        type="date"
        className="search-input"
        value={filters.endDate}
        onChange={(e) => handleChange('endDate', e.target.value)}
      />
      <select
        className="search-input"
        value={filters.technician}
        onChange={(e) => handleChange('technician', e.target.value)}
      >
        <option value="">Todos los técnicos</option>
        {technicianOptions.map(t => (
          <option key={t.idUsuario} value={t.idUsuario}>{t.nombre}</option>
        ))}
      </select>
      <input
        type="text"
        className="search-input"
        placeholder="Cliente"
        value={filters.client}
        onChange={(e) => handleChange('client', e.target.value)}
      />
    </div>
  )
}
