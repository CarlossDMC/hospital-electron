// src/pages/CadUsuario.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadUsuario() {
    const registerFields = [
        {
            name: "username",
            label: "Usuário",
            type: "text",
            placeholder: "Digite o nome de usuário",
            required: true,
        },
        {
            name: "password",
            label: "Senha",
            type: "password",
            placeholder: "Digite a senha",
            required: true,
        },
        {
            name: "role",
            label: "Função",
            type: "select",
            options: [
                { label: "Administrador", value: "admin" },
                { label: "Usuário", value: "user" },
                // Adicione mais opções conforme necessário
            ],
            placeholder: "Selecione a função",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email",
            required: true,
        },
        // Adicione mais campos conforme necessário
    ];

    const endpoint = "https://api.exemplo.com/usuarios"; // Substitua pelo seu endpoint real
    const successPath = "/PesUsuario"; // Rota para redirecionamento após cadastro

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Usuário do Sistema</h1>
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
