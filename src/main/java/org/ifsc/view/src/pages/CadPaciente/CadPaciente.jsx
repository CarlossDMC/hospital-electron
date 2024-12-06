// src/pages/CadPaciente.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import {Bounce, toast} from "react-toastify";

export default function CadPaciente() {
    const registerFields = [
        {
            name: "nome",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do paciente",
            required: true,
        },
        {
            name: "fone1",
            label: "Telefone Fixo",
            type: "text",
            placeholder: "Digite o telefone fixo",
            required: true,
        },
        {
            name: "fone2",
            label: "Telefone Celular",
            type: "text",
            placeholder: "Digite o telefone celular",
            required: false,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do paciente",
            required: true,
        },
        {
            name: "cpfCnpj",
            label: "CPF/CNPJ",
            type: "text",
            placeholder: "Digite o CPF ou CNPJ do paciente",
            required: true,
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou inscrição estadual",
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
        {
            name: "tipoSanguineo",
            label: "Tipo Sanguíneo",
            type: "select",
            options: [
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
            ],
            placeholder: "Selecione o tipo sanguíneo",
            required: true,
        },
        {
            name: "sexo",
            label: "Sexo",
            type: "select",
            options: [
                { label: "Masculino", value: "Masculino" },
                { label: "Feminino", value: "Feminino" },
                { label: "Outro", value: "Outro" },
            ],
            placeholder: "Selecione o sexo",
            required: true,
        },
        {
            name: "nomeSocial",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social (opcional)",
            required: false,
        },
    ];

    const endpoint = "http://localhost:8000/paciente";
    const successPath = "/PesPaciente";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Paciente</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
                onSuccess={() => {
                    toast.success('Cadastro feito com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }}
                // onError={(error) => console.error("Erro no cadastro:", error)}
            />
        </div>
    );
}
