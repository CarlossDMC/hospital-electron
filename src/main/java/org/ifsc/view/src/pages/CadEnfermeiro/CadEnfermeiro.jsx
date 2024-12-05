// src/pages/CadEnfermeiro.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadEnfermeiro() {
    const registerFields = [
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do enfermeiro",
            required: true,
        },
        {
            name: "department",
            label: "Departamento",
            type: "text",
            placeholder: "Digite o departamento",
            required: true,
        },
        {
            name: "shift",
            label: "Turno",
            type: "text",
            placeholder: "Digite o turno",
            required: true,
        },
        // Adicione mais campos conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/enfermeiros"; // Substitua pelo seu endpoint real
    const successPath = "/PesEnfermeiro"; // Rota para redirecionamento após cadastro

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Enfermeiro</h1>
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
