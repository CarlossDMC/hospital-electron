import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesMedico() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do médico" },
        { name: "crm", label: "CRM", type: "text", placeholder: "Digite o CRM do medico" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "nome" },
        { header: "CRM", accessor: "crm" },
        { header: "Fone 1", accessor: "fone1" },
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
                idAcess={"id"}
            />
        </div>
    );
}
