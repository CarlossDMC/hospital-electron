import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import { useParams } from "react-router-dom";

export default function CadFornecedor() {
    const { id } = useParams();
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
            placeholder: "Digite o nome do fornecedor",
            required: true,
            width: "88%",
        },
        {
            name: "nomeFantasia",
            label: "Nome Fantasia",
            type: "text",
            placeholder: "Digite o nome fantasia",
            required: true,
            width: "60%",
        },
        {
            name: "fone1",
            label: "Telefone Fixo",
            type: "text",
            placeholder: "Digite o telefone fixo",
            required: true,
            width: "38%",
        },
        {
            name: "contato",
            label: "Contato",
            type: "text",
            placeholder: "Digite o nome do contato",
            required: true,
            width: "60%",
        },
        {
            name: "fone2",
            label: "Telefone Celular",
            type: "text",
            placeholder: "Digite o telefone celular",
            required: false,
            width: "38%",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do fornecedor",
            required: true,
            width: "30%",
        },
        {
            name: "cpfCnpj",
            label: "CPF/CNPJ",
            type: "text",
            placeholder: "Digite o CPF ou CNPJ do fornecedor",
            required: true,
            width: "35%",
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou inscrição estadual",
            required: false,
            width: "31%",
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
            width: "30%",
        },
        {
            name: "bairro",
            label: "Bairro",
            type: "text",
            placeholder: "Digite o bairro",
            required: true,
            width: "36%",
        },
        {
            name: "logradouro",
            label: "Logradouro",
            type: "text",
            placeholder: "Digite o logradouro",
            required: true,
            width: "35%",
        },
        {
            name: "complemento",
            label: "Complemento",
            type: "text",
            placeholder: "Digite o complemento",
            required: false,
            width: "30%",
        },
    ];

    const endpoint = "http://localhost:8000/fornecedor";
    const successPath = "/PesFornecedor";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Fornecedor</h1>
            <GenericRegister
                fields={registerFields}
                entidade={'Fornecedor'}
                endpoint={endpoint}
                successPath={successPath}
                id={id || 0}
                onSuccess={() => {}}
            />
        </div>
    );
}
