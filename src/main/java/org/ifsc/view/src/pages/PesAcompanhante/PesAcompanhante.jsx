import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesAcompanhante() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do acompanhante" },
        { name: "grau_Parentesco", label: "Relação", type: "text", placeholder: "Digite a relação" },
        { name: "fone", label: "Contato", type: "text", placeholder: "Digite o contato" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "nome" },
        { header: "Relação", accessor: "grauParentesco" },
        { header: "Contato", accessor: "fone" },
        { header: "Email", accessor: "email" },
    ];

    const endpoint = "http://localhost:8000/acompanhante";
    const registerPath = "/CadAcompanhante";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Acompanhantes</h1>
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
