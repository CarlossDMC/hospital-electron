// src/pages/PesAcompanhante.jsx
import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesAcompanhante() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do acompanhante" },
        { name: "relationship", label: "Relação", type: "text", placeholder: "Digite a relação" },
        { name: "contact", label: "Contato", type: "text", placeholder: "Digite o contato" },
        // Adicione mais campos conforme necessário
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Relação", accessor: "relationship" },
        { header: "Contato", accessor: "contact" },
        // Adicione mais colunas conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/acompanhantes"; // Substitua pelo seu endpoint real
    const registerPath = "/CadAcompanhante"; // Rota para a tela de cadastro de Acompanhante

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Acompanhantes</h1>
            <GenericSearch
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}