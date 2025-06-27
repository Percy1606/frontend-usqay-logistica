import { VentaServicio } from '../entities/venta';

export const ventasMock: VentaServicio[] = [
  {
    idVentaServicio: 'VENTA-0001',
    cliente: {
      idCliente: 'CL-001',
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      telefono: '999888777',
    },
    detalles: [
      {
        idDetalleServicio: 'DET-001',
        idServicio: 'SVC-001',
        nombreServicio: 'Instalación de Router',
        costoTotal: 100,
      },
    ],
    productos: [
      {
        idProducto: 'PROD-001',
        nombreProducto: 'Cable de red 5m',
        cantidad: 2,
        precioUnitario: 15,
        precioTotal: 30,
      },
      {
        idProducto: 'PROD-002',
        nombreProducto: 'Router TP-Link',
        cantidad: 1,
        precioUnitario: 120,
        precioTotal: 120,
      },
    ],
    descuento: 10,
    costoTotal: 240, // 100 + 30 + 120 - 10
    fechaRegistro: new Date().toISOString(),
  },
];
