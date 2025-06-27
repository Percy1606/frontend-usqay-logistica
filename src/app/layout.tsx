import type { Metadata } from 'next'
import './Home.css'
import {
  FaHome,
  FaBoxes,
  FaShoppingCart,
  FaChartBar,
  FaSearch,
  FaWarehouse,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaChevronRight,
  FaCog,
  FaBell
} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { Sidebar } from './components/Sidebar'

export const metadata: Metadata = {
  title: 'Usqay Logística',
  description: 'Sistema de gestión logística',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div className="layout-container">
          <Sidebar/>
          <main className="content">
            <header className="main-header">
              <div className="header-content">
                <h1></h1>
                <div className="header-actions">
                  <button className="header-btn notification-btn">
                    <FaBell />
                    <span className="notification-badge">3</span>
                  </button>
    
                  <div className="user-info">
                    <span><FaUser /> Admin</span>
                    <button className="logout-btn">
                      <FaSignOutAlt /> Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}