// src/pages/CadMedico.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadMedico() {
    const registerFields = [
        {
            name: "id",
            label: "ID",
            type: "text",
            value: "123",
            disabled: true,
            width: "10%",
        },
        {
            name: "nome",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do médico",
            required: true,
            width: "55%",
        },
        {
            name: "nomeSocial",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social do médico",
            required: false,
            width: "30%",
        },
        {
            name: "login",
            label: "Login",
            type: "text",
            placeholder: "Digite o login do médico",
            required: true,
            width: "35%",
        },
        {
            name: "senha",
            label: "Senha",
            type: "password",
            placeholder: "Digite a senha",
            required: true,
            width: "30%",
        },
        {
            name: "crm",
            label: "CRM",
            type: "text",
            placeholder: "Digite o CRM do médico",
            required: true,
            width: "30%",
        },
        {
            name: "cpfCnpj",
            label: "CPF/CNPJ",
            type: "text",
            placeholder: "Digite o CPF",
            required: true,
            width: "40%",
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou Inscrição Estadual do médico",
            required: true,
            width: "30%",
        },
        {
            name: "fone1",
            label: "Telefone",
            type: "text",
            placeholder: "Digite o telefone do médico",
            required: true,
            width: "25%",
        },
        {
            name: "fone2",
            label: "Celular",
            type: "text",
            placeholder: "Digite o celular do médico",
            required: false,
            width: "30%",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do médico",
            required: true,
            width: "35%",
        },
        {
            name: "cep",
            label: "CEP",
            type: "text",
            placeholder: "Digite o CEP",
            required: true,
            width: "30%",
        },
        {
            name: "cidade",
            label: "Cidade",
            type: "text",
            placeholder: "Digite a cidade",
            required: true,
            width: "35%",
        },
        {
            name: "bairro",
            label: "Bairro",
            type: "text",
            placeholder: "Digite o bairro",
            required: true,
            width: "30%",
        },
        {
            name: "logradouro",
            label: "Logradouro",
            type: "text",
            placeholder: "Digite o logradouro",
            required: true,
            width: "30%",
        },
        {
            name: "complemento",
            label: "Complemento",
            type: "text",
            placeholder: "Digite o complemento",
            required: false,
            width: "98.5%",
        },
    ];

    const endpoint = "https://api.exemplo.com/doctors"; // Ajuste o endpoint real da sua API
    const successPath = "/PesMedico"; // Ajuste a rota de sucesso após o cadastro

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Médico</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
            />
        </div>
    );
}
