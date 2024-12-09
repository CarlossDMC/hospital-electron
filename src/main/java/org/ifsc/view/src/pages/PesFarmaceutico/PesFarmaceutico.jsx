import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesFarmaceutico() {
    const searchFields = [
        { name: "name", label: "Nome", type: "text", placeholder: "Digite o nome do farmacêutico" },
        { name: "licenseNumber", label: "Número da Licença", type: "text", placeholder: "Digite o número da licença" },
        { name: "pharmacy", label: "Farmácia", type: "text", placeholder: "Digite a farmácia" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "name" },
        { header: "Número da Licença", accessor: "licenseNumber" },
        { header: "Farmácia", accessor: "pharmacy" },
    ];

    const endpoint = "http://localhost:8000/farmaceutico";
    const registerPath = "/CadFarmaceutico";

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
