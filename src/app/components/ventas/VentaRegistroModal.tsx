'use client';

import React, { useState, useRef } from 'react';
import { Cliente, DetalleServicio, VentaServicio } from '../../../entities/venta';
import { useVentas } from '../../../hooks/useVentas';
import { formatCurrency } from '../../../lib/logistica/formatters';

type Props = {
  open: boolean;
  onClose: () => void;
};

const VentaRegistroModal = ({ open, onClose }: Props) => {
  if (!open) return null;

  const { registrarVenta } = useVentas();
  const idRef = useRef(Date.now());

  const [nombreCliente, setNombreCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  const [serviciosDisponibles, setServiciosDisponibles] = useState<{ idServicio: string; nombre: string; costo: number }[]>([]);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', costo: 0 });
  const [detalles, setDetalles] = useState<DetalleServicio[]>([]);

  const [productosDisponibles, setProductosDisponibles] = useState<{ idProducto: string; nombre: string; precio: number }[]>([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0 });
  const [productosSeleccionados, setProductosSeleccionados] = useState<{ idProductoDetalle: string; nombreProducto: string; cantidad: number; precioTotal: number }[]>([]);

  const [descuento, setDescuento] = useState(0);
  const [error, setError] = useState('');

  const agregarServicioDisponible = () => {
    if (!nuevoServicio.nombre || nuevoServicio.costo <= 0) return;
    const nuevo = {
      idServicio: `SVC-${Date.now()}`,
      nombre: nuevoServicio.nombre,
      costo: nuevoServicio.costo,
    };
    setServiciosDisponibles((prev) => [...prev, nuevo]);
    setNuevoServicio({ nombre: '', costo: 0 });
  };

  const agregarProductoDisponible = () => {
    if (!nuevoProducto.nombre || nuevoProducto.precio <= 0) return;
    const nuevo = {
      idProducto: `PROD-${Date.now()}`,
      nombre: nuevoProducto.nombre,
      precio: nuevoProducto.precio,
    };
    setProductosDisponibles((prev) => [...prev, nuevo]);
    setNuevoProducto({ nombre: '', precio: 0 });
  };

  const agregarServicioASeleccionados = (id: string) => {
    const servicio = serviciosDisponibles.find((s) => s.idServicio === id);
    if (!servicio || detalles.some((d) => d.idServicio === id)) return;
    setDetalles((prev) => [
      ...prev,
      {
        idDetalleServicio: `DET-${Date.now()}`,
        idServicio: servicio.idServicio,
        nombreServicio: servicio.nombre,
        costoTotal: servicio.costo,
      },
    ]);
  };

  const quitarServicio = (id: string) => {
    setDetalles((prev) => prev.filter((s) => s.idServicio !== id));
  };

  const agregarProductoAVenta = (id: string) => {
    const producto = productosDisponibles.find((p) => p.idProducto === id);
    if (!producto || productosSeleccionados.some((p) => p.nombreProducto === producto.nombre)) return;
    setProductosSeleccionados((prev) => [
      ...prev,
      {
        idProductoDetalle: `PRODDET-${Date.now()}`,
        nombreProducto: producto.nombre,
        cantidad: 1,
        precioTotal: producto.precio,
      },
    ]);
  };

  const quitarProducto = (nombre: string) => {
    setProductosSeleccionados((prev) => prev.filter((p) => p.nombreProducto !== nombre));
  };

  const cambiarCantidadProducto = (nombre: string, cantidad: number) => {
    setProductosSeleccionados((prev) =>
      prev.map((p) =>
        p.nombreProducto === nombre
          ? { ...p, cantidad, precioTotal: cantidad * (p.precioTotal / p.cantidad) }
          : p
      )
    );
  };

  const totalServicios = detalles.reduce((acc, s) => acc + s.costoTotal, 0);
  const totalProductos = productosSeleccionados.reduce((acc, p) => acc + p.precioTotal, 0);
  const total = Math.max(0, totalServicios + totalProductos - descuento);

  const handleSubmit = () => {
    if (!nombreCliente || detalles.length === 0) {
      setError('⚠️ Debes ingresar un cliente y al menos un servicio.');
      return;
    }

    const venta: VentaServicio & { productos?: any[] } = {
      idVentaServicio: `VENTA-${idRef.current}`,
      cliente: {
        idCliente: `CL-${idRef.current}`,
        nombre: nombreCliente,
        correo: correoCliente,
        telefono: telefonoCliente,
      },
      detalles,
      productos: productosSeleccionados,
      descuento,
      costoTotal: total,
      fechaRegistro: new Date().toISOString(),
    };

    registrarVenta(venta);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>➕ Registrar Venta</h2>

        <h3>👤 Datos del Cliente</h3>
        <input placeholder="Nombre" value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} />
        <input placeholder="Correo" value={correoCliente} onChange={e => setCorreoCliente(e.target.value)} />
        <input placeholder="Teléfono" value={telefonoCliente} onChange={e => setTelefonoCliente(e.target.value)} />

        <h3>📄 Servicios Disponibles</h3>
        <input placeholder="Nombre del servicio" value={nuevoServicio.nombre} onChange={e => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })} />
        <input type="number" value={nuevoServicio.costo} onChange={e => setNuevoServicio({ ...nuevoServicio, costo: Number(e.target.value) })} />
        <button onClick={agregarServicioDisponible} className="btn-simple">➕ Añadir</button>

        <h3>📦 Productos Disponibles</h3>
        <input placeholder="Nombre del producto" value={nuevoProducto.nombre} onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
        <input type="number" value={nuevoProducto.precio} onChange={e => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })} />
        <button onClick={agregarProductoDisponible} className="btn-simple">➕ Añadir</button>

        <h3>🛒 Selección para la venta</h3>
        <input type="number" value={descuento} onChange={(e) => setDescuento(Number(e.target.value))} placeholder="Descuento (S/.)" />

        <p className="text-green-700 font-bold mt-2 text-right">Total: S/. {total.toFixed(2)}</p>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="botones">
          <button className="btn-cancelar" onClick={onClose}>❌ Cancelar</button>
          <button className="btn-primario" onClick={handleSubmit}>💾 Registrar</button>
        </div>
      </div>
    </div>
  );
};

export default VentaRegistroModal;
