// src/pages/PesEnfermeiro.jsx
import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesEnfermeiro() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do enfermeiro" },
        { name: "department", label: "Departamento", type: "text", placeholder: "Digite o departamento" },
        { name: "shift", label: "Turno", type: "text", placeholder: "Digite o turno" },
        // Adicione mais campos conforme necessário
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Departamento", accessor: "department" },
        { header: "Turno", accessor: "shift" },
        // Adicione mais colunas conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/enfermeiros"; // Substitua pelo seu endpoint real
    const registerPath = "/CadEnfermeiro"; // Rota para a tela de cadastro de Enfermeiro

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
