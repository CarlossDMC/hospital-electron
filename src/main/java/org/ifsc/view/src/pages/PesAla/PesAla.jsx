import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesAla() {
    const searchFields = [
        { name: "descricao", label: "Descrição", type: "text", placeholder: "Digite a descrição da Ala" },
        { name: "status", label: "Status", type: "select", options: [
                { label: "Ativo", value: "Ativo" },
                { label: "Inativo", value: "Inativo" }
            ] }
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Descrição", accessor: "descricao" },
        { header: "Status", accessor: "status" },
    ];

    const endpoint = "http://localhost:8000/ala";
    const registerPath = "/CadAla";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Alas</h1>
            <GenericSearch
                fields={searchFields}
                endpoint={endpoint}
                idAcess={"id"}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}
