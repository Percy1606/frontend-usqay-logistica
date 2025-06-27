    import {
    FaHome,
    FaBoxes,
    FaSearch,
    FaWarehouse,
    FaClipboardList,
    FaBars,
    FaUsers,
    FaChartBar, // Ícono para la barra de navegación
     FaTruck,
     FaUserFriends,
     FaTools,
     FaShoppingCart
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="logo">
                <div className="logo-container">
                    <Image src="/log-usqay.svg" alt="Logo Empresa" className="object-contain"
                        width={165}
                        height={70} />
                    <h2></h2>
                </div>
            </div>
            <ul>{/*  ícono de menú aquí 
            <div className="menu-icon">
                <FaBars />
            </div>*/}
                <li><Link href="/"><FaHome /> Página Principal</Link></li>
                <li><Link href="/dashboard/gestion-de-productos"><FaBoxes /> Gestión de productos</Link></li>
                <li><Link href="/dashboard/gestion_servicios"><FaTools />Gestion de servicios </Link></li>
                <li><Link href="/dashboard/gestion_ventas"><FaShoppingCart /> Gestión de ventas</Link></li>
                <li><Link href="/dashboard/gestion_almacen"><FaClipboardList /> Gestion de almacen</Link></li>
                <li><Link href="/dashboard/clientes"><FaUserFriends /> Clientes </Link></li>
                <li><Link href="/dashboard/proovedor">< FaTruck /> Proveedores</Link></li>
            </ul>
            
        </nav>
    )
}