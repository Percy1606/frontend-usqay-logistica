export const ROUTES = {
  DASHBOARD: "/",
  NEGOCIOS: "/clientes",
  FACTURACION: "/facturacion",
  PAGOS: "/pagos",
  REPORTES: "/reportes",
  CONFIGURACION: "/configuracion",
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = (typeof ROUTES)[RouteKey]
