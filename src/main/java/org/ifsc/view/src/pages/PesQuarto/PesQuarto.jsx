import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesQuarto() {
    const searchFields = [
        { name: "descricao", label: "Descrição", type: "text", placeholder: "Digite a descrição do Quarto" },
        { name: "status", label: "Status", type: "select", options: [
                { label: "Ativo", value: "Ativo" },
                { label: "Inativo", value: "Inativo" }
            ] }
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Descrição", accessor: "descricao" },
        { header: "Status", accessor: "status" },
        { header: "Ala", accessor: "alaDescricao" }
    ];

    const endpoint = "http://localhost:8000/quarto";
    const registerPath = "/CadQuarto";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Quartos</h1>
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
