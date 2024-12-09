import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import {useParams} from "react-router-dom";

export default function CadEnfermeiro() {
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
            placeholder: "Digite o nome do enfermeiro",
            required: true,
            width: "55%",
        },
        {
            name: "nomeSocial",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social do enfermeiro",
            required: false,
            width: "30%",
        },
        {
            name: "login",
            label: "Login",
            type: "text",
            placeholder: "Digite o login do enfermeiro",
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
            name: "cre",
            label: "CRE",
            type: "text",
            placeholder: "Digite o CRE do enfermeiro",
            required: true,
            width: "30%",
        },
        {
            name: "cpfCnpj",
            label: "CPF/CNPJ",
            type: "text",
            placeholder: "Digite o CPF ou CNPJ",
            required: true,
            width: "40%",
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou Inscrição Estadual",
            required: true,
            width: "30%",
        },
        {
            name: "fone1",
            label: "Telefone",
            type: "text",
            placeholder: "Digite o telefone",
            required: true,
            width: "25%",
        },
        {
            name: "fone2",
            label: "Celular",
            type: "text",
            placeholder: "Digite o celular",
            required: false,
            width: "30%",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email",
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

    const endpoint = "http://localhost:8000/enfermeiro";
    const successPath = "/PesEnfermeiro";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Enfermeiro</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
                id={id || 0}
                entidade={"Enfermeiro"}
            />
        </div>
    );
}
