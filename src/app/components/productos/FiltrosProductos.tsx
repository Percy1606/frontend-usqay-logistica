'use client'
import React from 'react'
import { FaSearch, FaFilter, FaBroom } from 'react-icons/fa'

interface FiltrosProps {
  onChangeFiltros: (filtros: { texto: string; stock: string }) => void
  onResetFiltros: () => void
}

export default function FiltrosProductos({ onChangeFiltros, onResetFiltros }: FiltrosProps) {
  const [filtrosLocales, setFiltrosLocales] = React.useState({
    texto: '',
    stock: 'Todos'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltrosLocales({ ...filtrosLocales, [e.target.name]: e.target.value })
  }

  const aplicarFiltros = () => {
    onChangeFiltros(filtrosLocales)
  }

  const limpiarFiltros = () => {
    const filtrosVacios = { texto: '', stock: 'Todos' }
    setFiltrosLocales(filtrosVacios)
    onResetFiltros()
  }

  return (
    <div className="filters-section">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          name="texto"
          placeholder="Buscar productos..."
          className="search-input"
          value={filtrosLocales.texto}
          onChange={handleChange}
        />
      </div>
      <div className="filter-group">
        <div className="filter-item">
          <label>Stock</label>
          <select name="stock" value={filtrosLocales.stock} onChange={handleChange}>
            <option value="Todos">Todos</option>
            <option value="Alto">Alto</option>
            <option value="Bajo">Bajo</option>
          </select>
        </div>
        <button className="filter-btn" onClick={aplicarFiltros}>
          <FaFilter /> Filtrar
        </button>
        <button className="filter-btn" onClick={limpiarFiltros}>
          <FaBroom style={{ marginRight: '4px' }} /> Limpiar
        </button>
      </div>
    </div>
  )
}
