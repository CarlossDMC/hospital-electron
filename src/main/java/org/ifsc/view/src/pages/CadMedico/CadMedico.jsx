// src/pages/CadMedico.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadMedico() {
    const registerFields = [
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do médico",
            required: true,
        },
        {
            name: "specialization",
            label: "Especialização",
            type: "text",
            placeholder: "Digite a especialização",
            required: true,
        },
        {
            name: "hospital",
            label: "Hospital",
            type: "text",
            placeholder: "Digite o hospital",
            required: true,
        },
        // Adicione mais campos conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/medicos"; // Substitua pelo seu endpoint real
    const successPath = "/PesMedico"; // Rota para redirecionamento após cadastro

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Médico</h1>
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
