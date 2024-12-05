// src/pages/CadEnfermeiro.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadEnfermeiro() {
    const registerFields = [
        {
            name: "nome",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do enfermeiro",
            required: true,
        },
        {
            name: "nomeSocial",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social do enfermeiro",
            required: false,
        },
        {
            name: "login",
            label: "Login",
            type: "text",
            placeholder: "Digite o login do enfermeiro",
            required: true,
        },
        {
            name: "senha",
            label: "Senha",
            type: "password",
            placeholder: "Digite a senha",
            required: true,
        },
        {
            name: "cre",
            label: "CRE",
            type: "text",
            placeholder: "Digite o CRE do enfermeiro",
            required: true,
        },
        {
            name: "cpfCnpj",
            label: "CPF/CNPJ",
            type: "text",
            placeholder: "Digite o CPF ou CNPJ",
            required: true,
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou Inscrição Estadual",
            required: true,
        },
        {
            name: "fone1",
            label: "Telefone",
            type: "text",
            placeholder: "Digite o telefone",
            required: true,
        },
        {
            name: "fone2",
            label: "Celular",
            type: "text",
            placeholder: "Digite o celular",
            required: false,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email",
            required: true,
        },
        {
            name: "cep",
            label: "CEP",
            type: "text",
            placeholder: "Digite o CEP",
            required: true,
        },
        {
            name: "cidade",
            label: "Cidade",
            type: "text",
            placeholder: "Digite a cidade",
            required: true,
        },
        {
            name: "bairro",
            label: "Bairro",
            type: "text",
            placeholder: "Digite o bairro",
            required: true,
        },
        {
            name: "logradouro",
            label: "Logradouro",
            type: "text",
            placeholder: "Digite o logradouro",
            required: true,
        },
        {
            name: "complemento",
            label: "Complemento",
            type: "text",
            placeholder: "Digite o complemento",
            required: false,
        },
    ];

    const endpoint = "https://api.exemplo.com/enfermeiros"; // Substitua pelo endpoint real da sua API
    const successPath = "/PesEnfermeiro"; // Ajuste a rota de sucesso após o cadastro

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Enfermeiro</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
            />
        </div>
    );
}
