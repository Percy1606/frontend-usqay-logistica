import { VentaServicio } from '../entities/servicios'

export function useVentasServicio() {
  const fetchVentas = async (): Promise<VentaServicio[]> => {
    const res = await fetch('/api/ventas-servicio')
    return await res.json()
  }

  const registrarVenta = async (venta: VentaServicio): Promise<void> => {
    await fetch('/api/ventas-servicio', {
      method: 'POST',
      body: JSON.stringify(venta),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return {
    fetchVentas,
    registrarVenta
  }
}
