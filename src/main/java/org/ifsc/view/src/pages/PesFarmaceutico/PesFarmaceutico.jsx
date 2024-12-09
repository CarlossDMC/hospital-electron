import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesFarmaceutico() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do farmacêutico" },
        { name: "cfr", label: "Número da Licença", type: "text", placeholder: "Digite o número da licença" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Nome", accessor: "nome" },
        { header: "Número da Licença", accessor: "cfr" },
        { header: "Telefone", accessor: "fone" },
        { header: "Email", accessor: "email" },
    ];

    const endpoint = "http://localhost:8000/farmaceutico";
    const registerPath = "/CadFarmaceutico";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Farmacêuticos</h1>
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
