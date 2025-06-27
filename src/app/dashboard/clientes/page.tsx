// Archivo: src/app/dashboard/clientes/page.tsx

import EmpresaForm from "../../components/cliente/EmpresaForm";
import EmpresaTable from "../../components/cliente/EmpresaTable";
import ComprobanteForm from "../../components/cliente/ComprobanteForm";
import HistorialVentasEmpresa from "../../components/cliente/HistorialVentasEmpresa";
import "../../../styles/cliente.css";

export default function ClientesPage() {
  return (
    <div className="empresas-container">
      <h1 className="titulo-principal">Gestión de Restaurantes y Clientes</h1>
      <EmpresaForm />
      <EmpresaTable />
    </div>
  );
}
