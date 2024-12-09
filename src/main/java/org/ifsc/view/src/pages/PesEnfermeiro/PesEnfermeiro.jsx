import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesEnfermeiro() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do enfermeiro" },
        { name: "department", label: "Departamento", type: "text", placeholder: "Digite o departamento" },
        { name: "shift", label: "Turno", type: "text", placeholder: "Digite o turno" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Departamento", accessor: "department" },
        { header: "Turno", accessor: "shift" },
    ];

    const endpoint = "http://localhost:8000/enfermeiro";
    const registerPath = "/CadEnfermeiro";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Enfermeiros</h1>
            <GenericSearch
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}
