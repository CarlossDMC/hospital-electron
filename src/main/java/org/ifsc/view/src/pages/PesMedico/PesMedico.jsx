import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesMedico() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do médico" },
        { name: "specialization", label: "Especialização", type: "text", placeholder: "Digite a especialização" },
        { name: "hospital", label: "Hospital", type: "text", placeholder: "Digite o hospital" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Especialização", accessor: "specialization" },
        { header: "Hospital", accessor: "hospital" },
    ];

    const endpoint = "http://localhost:8000/medico";
    const registerPath = "/CadMedico";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Médicos</h1>
            <GenericSearch
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}
