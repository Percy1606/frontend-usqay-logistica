import { useState } from 'react';
import { VentaServicio } from '../entities/venta';

export const useVentas = () => {
  const [ventas, setVentas] = useState<VentaServicio[]>([
    {
      idVentaServicio: 'VENTA-001',
      cliente: {
        idCliente: 'CL-001',
        nombre: 'Juan Pérez',
        correo: 'juan@correo.com',
        telefono: '123456789',
      },
      detalles: [
        {
          idDetalleServicio: 'DET-001',
          idServicio: 'SVC-001',
          nombreServicio: 'Soporte Técnico',
          costoTotal: 100,
        },
      ],
      productos: [
        {
          idProducto: 'PROD-001',
          nombreProducto: 'Mouse Logitech',
          cantidad: 1,
          precioUnitario: 40,
          precioTotal: 40,
        },
      ],
      descuento: 0,
      costoTotal: 140,
      fechaRegistro: new Date('2025-06-15').toISOString(),
    },
    {
      idVentaServicio: 'VENTA-002',
      cliente: {
        idCliente: 'CL-002',
        nombre: 'Ana Torres',
        correo: 'ana@correo.com',
        telefono: '987654321',
      },
      detalles: [
        {
          idDetalleServicio: 'DET-002',
          idServicio: 'SVC-002',
          nombreServicio: 'Instalación de Software',
          costoTotal: 80,
        },
      ],
      productos: [
        {
          idProducto: 'PROD-002',
          nombreProducto: 'Teclado Mecánico',
          cantidad: 1,
          precioUnitario: 60,
          precioTotal: 60,
        },
      ],
      descuento: 10,
      costoTotal: 130,
      fechaRegistro: new Date('2025-06-12').toISOString(),
    },
    {
      idVentaServicio: 'VENTA-003',
      cliente: {
        idCliente: 'CL-003',
        nombre: 'Luis Mejía',
        correo: 'luis@correo.com',
        telefono: '456789123',
      },
      detalles: [
        {
          idDetalleServicio: 'DET-003',
          idServicio: 'SVC-003',
          nombreServicio: 'Configuración de Red',
          costoTotal: 150,
        },
      ],
      productos: [],
      descuento: 0,
      costoTotal: 150,
      fechaRegistro: new Date('2025-06-10').toISOString(),
    },
    {
      idVentaServicio: 'VENTA-004',
      cliente: {
        idCliente: 'CL-004',
        nombre: 'María López',
        correo: 'maria@correo.com',
        telefono: '321654987',
      },
      detalles: [],
      productos: [
        {
          idProducto: 'PROD-003',
          nombreProducto: 'Laptop Acer Aspire',
          cantidad: 1,
          precioUnitario: 1800,
          precioTotal: 1800,
        },
        {
          idProducto: 'PROD-004',
          nombreProducto: 'Maletín para Laptop',
          cantidad: 1,
          precioUnitario: 80,
          precioTotal: 80,
        },
      ],
      descuento: 100,
      costoTotal: 1780,
      fechaRegistro: new Date('2025-06-09').toISOString(),
    },
  ]);

  const registrarVenta = (nuevaVenta: VentaServicio) => {
    if (!nuevaVenta.cliente || !nuevaVenta.detalles || nuevaVenta.detalles.length === 0) return;
    setVentas((prev) => [...prev, nuevaVenta]);
  };

  const eliminarVenta = (idVenta: string) => {
    setVentas((prev) => prev.filter((v) => v.idVentaServicio !== idVenta));
  };

  const editarVenta = (ventaActualizada: VentaServicio) => {
    setVentas((prev) =>
      prev.map((v) =>
        v.idVentaServicio === ventaActualizada.idVentaServicio ? ventaActualizada : v
      )
    );
  };

  return {
    ventas,
    registrarVenta,
    eliminarVenta,
    editarVenta,
  };
};
