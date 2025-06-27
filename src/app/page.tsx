import React from "react";
import { 
  FaBoxOpen, 
  FaUserTie, 
  FaChartPie, 
  FaClipboardCheck,
  FaMapMarkedAlt,
  FaTruckLoading
} from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link'; 

const Home = () => {
  // Datos 
  const dashboardData = {
    pendingOrders: 12,
    lowStockItems: 7,
    recentClients: 3,
    warehouseCapacity: '85%'
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Control Logístico</h1>
        <p>Resumen operativo </p>
      </header>

      {/* Sección de Métricas Rápidas */}
      <div className="metrics-section">
        <div className="metric-card">
          <div className="metric-icon"><FaTruckLoading /></div>
          <div className="metric-content">
            <h3>Órdenes Pendientes</h3>
            <p className="metric-value">{dashboardData.pendingOrders}</p>
            <p className="metric-label">Por despachar hoy</p>
          </div>
        </div>
        
        <div className="metric-card alert">
          <div className="metric-icon"><FaBoxOpen /></div>
          <div className="metric-content">
            <h3>Stock Bajo</h3>
            <p className="metric-value">{dashboardData.lowStockItems}</p>
            <p className="metric-label">Productos por reabastecer</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon"><FaUserTie /></div>
          <div className="metric-content">
            <h3>Nuevos Clientes</h3>
            <p className="metric-value">{dashboardData.recentClients}</p>
            <p className="metric-label">Esta semana</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon"><FaMapMarkedAlt /></div>
          <div className="metric-content">
            <h3>Capacidad Almacén</h3>
            <p className="metric-value">{dashboardData.warehouseCapacity}</p>
            <p className="metric-label">Espacio ocupado</p>
          </div>
        </div>
      </div>

      {/* Sección de Acciones Principales */}
      <div className="actions-section">
        <h2>Áreas Operativas</h2>
        
        <div className="action-grid">
          {/* Control de Inventario */}
          <Link href="./control-inventario" className="action-card">
            <div className="action-icon"><FaBoxOpen /></div>
            <div className="action-content">
              <h3>Control de Inventario</h3>
              <p>Gestión completa de productos y existencias</p>
              <div className="action-link">
                Ver detalles <FaChevronRight />
              </div>
            </div>
          </Link>
          
          {/* Gestión Comercial */}
          <Link href="./gestion-comercial" className="action-card">
            <div className="action-icon"><FaUserTie /></div>
            <div className="action-content">
              <h3>Gestión Comercial</h3>
              <p>Administración de clientes y relaciones</p>
              <div className="action-link">
                Ver detalles <FaChevronRight />
              </div>
            </div>
          </Link>
          
          {/* Análisis de Ventas */}
          <Link href="/reporte-ventas" className="action-card">
            <div className="action-icon"><FaChartPie /></div>
            <div className="action-content">
              <h3>Análisis de Ventas</h3>
              <p>Reportes y tendencias comerciales</p>
              <div className="action-link">
                Ver detalles <FaChevronRight />
              </div>
            </div>
          </Link>
          
          {/* Logística */}
          <Link href="/pedidos" className="action-card">
            <div className="action-icon"><FaTruckLoading /></div>
            <div className="action-content">
              <h3>Operaciones Logísticas</h3>
              <p>Seguimiento de pedidos y despachos</p>
              <div className="action-link">
                Ver detalles <FaChevronRight />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;