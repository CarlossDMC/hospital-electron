// src/pages/CadFarmaceutico.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadFarmaceutico() {
    const registerFields = [
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do farmacêutico",
            required: true,
        },
        {
            name: "licenseNumber",
            label: "Número da Licença",
            type: "text",
            placeholder: "Digite o número da licença",
            required: true,
        },
        {
            name: "pharmacy",
            label: "Farmácia",
            type: "text",
            placeholder: "Digite a farmácia",
            required: true,
        },
        // Adicione mais campos conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/farmaceuticos"; // Substitua pelo seu endpoint real
    const successPath = "/PesFarmaceutico"; // Rota para redirecionamento após cadastro

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Farmacêutico</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
                // onSuccess={(data) => console.log("Cadastro bem-sucedido:", data)}
                // onError={(error) => console.error("Erro no cadastro:", error)}
            />
        </div>
    );
}
