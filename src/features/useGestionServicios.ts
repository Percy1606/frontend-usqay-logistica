'use client'
import { useState } from 'react'
import { VentaServicio } from '../entities/servicios'
import { ventasMock } from '../mocks/mockData'

export default function useGestionServicios() {
  const [activeTab, setActiveTab] = useState<'registrar' | 'reportes'>('registrar')
  const [searchTerm, setSearchTerm] = useState('')
  const [ventasRegistradas, setVentasRegistradas] = useState<VentaServicio[]>(ventasMock)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    technician: '',
    client: ''
  })
  const [reports, setReports] = useState<VentaServicio[]>([])
  const [selectedReport, setSelectedReport] = useState<VentaServicio | null>(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const technicianOptions = Array.from(
    new Set(ventasRegistradas.map(v => v.tecnico.idUsuario))
  ).map(id => {
    const tecnico = ventasRegistradas.find(v => v.tecnico.idUsuario === id)?.tecnico
    return tecnico ?? { idUsuario: 0, nombre: 'Técnico desconocido' }
  })

  const formatCurrency = (value: number) => `S/ ${value.toFixed(2)}`

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString()

  const exportToCSV = (venta: VentaServicio) => {
    const encabezado = [
      'ID Cliente',
      'Cliente',
      'Técnico',
      'Fecha',
      'Total',
      'Servicios',
      'Productos'
    ]

    const fila = [
      venta.cliente.idCliente,
      venta.cliente.nombre,
      venta.tecnico.nombre,
      formatDate(venta.fechaRegistro),
      formatCurrency(venta.costoTotal),
      venta.detallesServicio.map(s => s.servicio.nombre).join(', '),
      venta.productos.map(p => `${p.producto.nombre} x${p.cantidad}`).join(', ')
    ]

    const csv = [encabezado.join(','), fila.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `venta-servicio-${venta.idVentaServicio}.csv`)
    link.click()
  }

  const viewReportDetails = (venta: VentaServicio) => {
    setSelectedReport(venta)
  }

  const registrarVenta = (venta: VentaServicio) => {
    setVentasRegistradas(prev => [venta, ...prev])
  }

  const generateReport = () => {
    setIsGeneratingReport(true)
    setTimeout(() => {
      const resultado = ventasRegistradas.filter(v => {
        const fecha = new Date(v.fechaRegistro)
        const inicio = filters.startDate ? new Date(filters.startDate) : null
        const fin = filters.endDate ? new Date(filters.endDate) : null
        const tecnico = filters.technician ? parseInt(filters.technician) : null
        const cliente = filters.client?.toLowerCase() || ''

        const coincideFecha = (!inicio || fecha >= inicio) && (!fin || fecha <= fin)
        const coincideTecnico = !tecnico || v.tecnico.idUsuario === tecnico
        const coincideCliente = !cliente || v.cliente.nombre.toLowerCase().includes(cliente)

        return coincideFecha && coincideTecnico && coincideCliente
      })
      setReports(resultado)
      setIsGeneratingReport(false)
    }, 500)
  }

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', technician: '', client: '' })
  }

  return {
    activeTab, setActiveTab,
    searchTerm, setSearchTerm,
    ventasRegistradas,
    filters, setFilters,
    reports,
    selectedReport, setSelectedReport,
    technicianOptions,
    exportToCSV,
    viewReportDetails,
    formatCurrency,
    formatDate,
    registrarVenta,
    generateReport,
    clearFilters,
    isGeneratingReport
  }
}