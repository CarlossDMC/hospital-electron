// src/pages/PesFarmaceutico.jsx
import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesFarmaceutico() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do farmacêutico" },
        { name: "licenseNumber", label: "Número da Licença", type: "text", placeholder: "Digite o número da licença" },
        { name: "pharmacy", label: "Farmácia", type: "text", placeholder: "Digite a farmácia" },
        // Adicione mais campos conforme necessário
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Número da Licença", accessor: "licenseNumber" },
        { header: "Farmácia", accessor: "pharmacy" },
        // Adicione mais colunas conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/farmaceuticos"; // Substitua pelo seu endpoint real
    const registerPath = "/CadFarmaceutico"; // Rota para a tela de cadastro de Farmacêutico

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Farmacêuticos</h1>
            <GenericSearch
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}
