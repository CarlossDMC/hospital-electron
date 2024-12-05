// src/pages/CadUsuario.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadUsuario() {
    const registerFields = [
        {
            name: "nome",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do usuário",
            required: true,
        },
        {
            name: "nomeSocial",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social do usuário",
            required: false,
        },
        {
            name: "login",
            label: "Login",
            type: "text",
            placeholder: "Digite o login do usuário",
            required: true,
        },
        {
            name: "senha",
            label: "Senha",
            type: "password",
            placeholder: "Digite a senha do usuário",
            required: true,
        },
        {
            name: "cpfCnpj",
            label: "CPF/CNPJ",
            type: "text",
            placeholder: "Digite o CPF ou CNPJ do usuário",
            required: true,
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou Inscrição Estadual do usuário",
            required: true,
        },
        {
            name: "fone1",
            label: "Telefone",
            type: "text",
            placeholder: "Digite o telefone do usuário",
            required: true,
        },
        {
            name: "fone2",
            label: "Celular",
            type: "text",
            placeholder: "Digite o celular do usuário (opcional)",
            required: false,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do usuário",
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
        // Caso queira incluir dataCadastro:
        // {
        //     name: "dataCadastro",
        //     label: "Data de Cadastro",
        //     type: "date",
        //     placeholder: "Selecione a data de cadastro",
        //     required: false,
        // },
    ];

    const endpoint = "https://api.exemplo.com/usuarios"; // Substitua pelo endpoint real da sua API
    const successPath = "/PesUsuario"; // Ajuste para a rota de sucesso após o cadastro

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Usuário</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
            />
        </div>
    );
}
