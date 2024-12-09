import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesEnfermeiro() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do enfermeiro" },
        { name: "cre", label: "CRE", type: "text", placeholder: "Digite o CRE do enfermeiro" },
        { name: "email", label: "Email", type: "text", placeholder: "Digite o email do enfermeiro" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "nome" },
        { header: "CRE", accessor: "cre" },
        { header: "Email", accessor: "email" },
    ];

    const endpoint = "http://localhost:8000/enfermeiro";
    const registerPath = "/CadEnfermeiro";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Enfermeiros</h1>
            <GenericSearch
                idAcess={"id"}
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}
