// src/pages/CadAcompanhante.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadAcompanhante() {
    const registerFields = [
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do acompanhante",
            required: true,
        },
        {
            name: "relationship",
            label: "Relação",
            type: "text",
            placeholder: "Digite a relação com o paciente",
            required: true,
        },
        {
            name: "contact",
            label: "Contato",
            type: "text",
            placeholder: "Digite o contato",
            required: true,
        },
        // Adicione mais campos conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/acompanhantes"; // Substitua pelo seu endpoint real
    const successPath = "/PesAcompanhante"; // Rota para redirecionamento após cadastro

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Acompanhante</h1>
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
