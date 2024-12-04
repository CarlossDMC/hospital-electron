// src/pages/SearchPatients.jsx
import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch";


export default function PesPaciente() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do paciente" },
        { name: "age", label: "Idade", type: "number", placeholder: "Digite a idade" },
        { name: "gender", label: "Gênero", type: "text", placeholder: "Digite o gênero" },
        // Adicione mais campos conforme necessário
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Idade", accessor: "age" },
        { header: "Gênero", accessor: "gender" },
        { header: "Email", accessor: "email" },
        // Adicione mais colunas conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/patients"; // Substitua pelo seu endpoint real

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Pacientes</h1>
            <GenericSearch fields={searchFields} endpoint={endpoint} columns={tableColumns} />
        </div>
    );
}
