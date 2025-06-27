'use client'
import React from 'react'
import HeaderProductos from '../../components/productos/HeaderProductos'
import FiltrosProductos from '../../components/productos/FiltrosProductos'
import TablaProductos from '../../components/productos/TablaProductos'
import FormularioNuevoProductoModal from '../../components/productos/FormularioNuevoProductomodal'
import '@/styles/productos.css'
import { Producto } from '@/shared/types/product.types'
import * as XLSX from 'xlsx'

export default function GestionDeProductosPage() {
  const [productos, setProductos] = React.useState<Producto[]>([])
  const [mostrarModal, setMostrarModal] = React.useState(false)
  const [productoEnEdicion, setProductoEnEdicion] = React.useState<Producto | null>(null)
  const [cargando, setCargando] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [filtros, setFiltros] = React.useState({
    texto: '',
    stock: 'Todos'
  })

  const cargarProductos = async () => {
    try {
      setCargando(true)
      setError(null)

      const data: Producto[] = [
        {
          idProducto: 1,
          nombre: 'Laptop Dell XPS 13',
          descripcion: 'Ultrabook con pantalla InfinityEdge',
          precio: 4500,
          stock: 15
        },
        {
          idProducto: 2,
          nombre: 'Auriculares Sony WH-1000XM5',
          descripcion: 'Cancelación activa de ruido',
          precio: 1200,
          stock: 8
        },
        {
          idProducto: 3,
          nombre: 'Mouse Logitech MX Master 3S',
          descripcion: 'Ergonómico y preciso',
          precio: 350,
          stock: 25
        },
        {
          idProducto: 4,
          nombre: 'Smartphone Samsung Galaxy S24',
          descripcion: 'Pantalla AMOLED y cámara triple',
          precio: 3800,
          stock: 20
        },
        {
          idProducto: 5,
          nombre: 'Teclado Mecánico Keychron K6',
          descripcion: 'Compacto con switches intercambiables',
          precio: 420,
          stock: 5
        },
        {
          idProducto: 6,
          nombre: 'TV LG OLED 55"',
          descripcion: 'Televisor inteligente 4K UHD',
          precio: 5200,
          stock: 3
        },
        {
          idProducto: 7,
          nombre: 'Tablet Apple iPad Air',
          descripcion: 'Chip M1 y pantalla Liquid Retina',
          precio: 3100,
          stock: 12
        },
        {
          idProducto: 8,
          nombre: 'Cámara Canon EOS M50',
          descripcion: 'Cámara sin espejo con grabación 4K',
          precio: 2700,
          stock: 10
        },
        {
          idProducto: 9,
          nombre: 'Monitor LG UltraWide 34"',
          descripcion: 'Resolución QHD para productividad',
          precio: 2600,
          stock: 9
        },
        {
          idProducto: 10,
          nombre: 'Impresora HP Smart Tank 720',
          descripcion: 'Impresión económica a color',
          precio: 980,
          stock: 17
        }
      ]

      setProductos(data)
    } catch (err) {
      console.error('Error cargando productos:', err)
      setError('No se pudieron cargar los productos.')
    } finally {
      setCargando(false)
    }
  }

  React.useEffect(() => {
    cargarProductos()
  }, [])

  const agregarOEditarProducto = async (producto: Partial<Producto> & { idProducto?: string | number }) => {
    try {
      const productoParaEnviar = {
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio !== undefined ? Number(producto.precio) : 0,
        stock: producto.stock !== undefined ? Number(producto.stock) : 0
      }

      if (producto.idProducto) {
        setProductos((prev) =>
          prev.map((p) =>
            Number(p.idProducto) === Number(producto.idProducto) ? { ...p, ...productoParaEnviar } : p
          )
        )
      } else {
        const nuevoProducto = {
          ...productoParaEnviar,
          idProducto: Date.now()
        }
        setProductos((prev) => [...prev, nuevoProducto as Producto])
      }

      setError(null)
    } catch (err) {
      console.error('Error al guardar producto:', err)
      setError('No se pudo guardar el producto.')
    }
  }

  const handleEliminar = async (idProducto: number) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este producto?')
    if (confirmar) {
      try {
        setProductos((prev) => prev.filter((p) => Number(p.idProducto) !== idProducto))
      } catch (err) {
        console.error('Error eliminando producto:', err)
      }
    }
  }

  const handleEditar = (producto: Producto) => {
    setProductoEnEdicion(producto)
    setMostrarModal(true)
  }

  const handleNuevo = () => {
    setProductoEnEdicion(null)
    setMostrarModal(true)
  }

  const resetearFiltros = () => {
    setFiltros({
      texto: '',
      stock: 'Todos'
    })
    cargarProductos()
  }

  const handleExportar = () => {
    try {
      const datosExportar = filtrarProductos().map(p => ({
        ID: p.idProducto,
        Nombre: p.nombre,
        Descripción: p.descripcion,
        Precio: p.precio,
        Stock: p.stock
      }))
      const hoja = XLSX.utils.json_to_sheet(datosExportar)
      const libro = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(libro, hoja, 'Productos')
      XLSX.writeFile(libro, 'productos.xlsx')
    } catch (err) {
      console.error('Error al exportar:', err)
    }
  }

  const filtrarProductos = () => {
    return productos.filter((p) => {
      const coincideTexto =
        filtros.texto === '' ||
        p.nombre.toLowerCase().includes(filtros.texto.toLowerCase())
      const coincideStock =
        filtros.stock === 'Todos' ||
        (filtros.stock === 'Alto' ? p.stock > 10 : p.stock < 10)
      return coincideTexto && coincideStock
    })
  }

  const productosFiltrados = filtrarProductos()

  return (
    <div className="dashboard-container">
      <HeaderProductos
        total={productosFiltrados.length}
        onNuevoProductoClick={handleNuevo}
        onExportarClick={handleExportar}
      />
      <FiltrosProductos
        onChangeFiltros={setFiltros}
        onResetFiltros={resetearFiltros}
      />
      {cargando && <p>Cargando productos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!cargando && !error && (
        <TablaProductos
          productos={productosFiltrados}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}
      {mostrarModal && (
        <FormularioNuevoProductoModal
          onAgregar={agregarOEditarProducto}
          onCerrar={() => setMostrarModal(false)}
          productoAEditar={productoEnEdicion}
        />
      )}
    </div>
  )
}
