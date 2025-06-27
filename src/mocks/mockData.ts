import { VentaServicio } from '../entities/servicios'

export const ventasMock: VentaServicio[] = [
  {
    idVentaServicio: 1,
    cliente: { idCliente: 101, nombre: 'Carlos Mendoza' },
    tecnico: { idUsuario: 301, nombre: 'Arnold Morante' },
    descuento: 0,
    costoTotal: 370,
    fechaRegistro: '2025-06-12T10:00:00Z',
    detallesServicio: [
      {
        idDetalleServicio: 1,
        servicio: { idServicio: 1, nombre: 'Mantenimiento', costo: 150 },
        costoTotal: 150,
        descuento: 0
      },
      {
        idDetalleServicio: 2,
        servicio: { idServicio: 2, nombre: 'Instalación', costo: 200 },
        costoTotal: 200,
        descuento: 0
      }
    ],
    productos: [
      {
        idProductoDetalleVenta: 1,
        producto: { idProducto: 1, nombre: 'Router' },
        cantidad: 1,
        precioTotal: 20,
        descuento: 0
      }
    ]
  },
  {
    idVentaServicio: 2,
    cliente: { idCliente: 102, nombre: 'Ana Torres' },
    tecnico: { idUsuario: 302, nombre: 'Leonardo Gutierres' },
    descuento: 0,
    costoTotal: 150,
    fechaRegistro: '2025-06-11T14:30:00Z',
    detallesServicio: [
      {
        idDetalleServicio: 3,
        servicio: { idServicio: 1, nombre: 'Mantenimiento', costo: 150 },
        costoTotal: 150,
        descuento: 0
      }
    ],
    productos: []
  },
  {
    idVentaServicio: 3,
    cliente: { idCliente: 103, nombre: 'Empresa Soluciones SAC' },
    tecnico: { idUsuario: 303, nombre: 'Pedro Valladares' },
    descuento: 20,
    costoTotal: 480,
    fechaRegistro: '2025-06-10T09:45:00Z',
    detallesServicio: [
      {
        idDetalleServicio: 4,
        servicio: { idServicio: 3, nombre: 'Instalación de Servidor', costo: 500 },
        costoTotal: 500,
        descuento: 20
      }
    ],
    productos: [
      {
        idProductoDetalleVenta: 2,
        producto: { idProducto: 2, nombre: 'Switch 24 puertos' },
        cantidad: 1,
        precioTotal: 100,
        descuento: 0
      }
    ]
  },
  {
    idVentaServicio: 4,
    cliente: { idCliente: 104, nombre: 'María Vargas' },
    tecnico: { idUsuario: 304, nombre: 'Sadro Martinez' },
    descuento: 0,
    costoTotal: 220,
    fechaRegistro: '2025-06-09T11:15:00Z',
    detallesServicio: [
      {
        idDetalleServicio: 5,
        servicio: { idServicio: 4, nombre: 'Configuración de Red', costo: 220 },
        costoTotal: 220,
        descuento: 0
      }
    ],
    productos: []
  },
  {
    idVentaServicio: 5,
    cliente: { idCliente: 105, nombre: 'Daniela Reátegui' },
    tecnico: { idUsuario: 305, nombre: 'Junior Mejía' },
    descuento: 15,
    costoTotal: 285,
    fechaRegistro: '2025-06-08T16:00:00Z',
    detallesServicio: [
      {
        idDetalleServicio: 6,
        servicio: { idServicio: 5, nombre: 'Soporte Técnico Empresarial', costo: 300 },
        costoTotal: 300,
        descuento: 15
      }
    ],
    productos: [
      {
        idProductoDetalleVenta: 3,
        producto: { idProducto: 3, nombre: 'Kit de mantenimiento' },
        cantidad: 1,
        precioTotal: 50,
        descuento: 0
      },
      {
        idProductoDetalleVenta: 4,
        producto: { idProducto: 4, nombre: 'Cable HDMI' },
        cantidad: 2,
        precioTotal: 30,
        descuento: 0
      }
    ]
  }
]
