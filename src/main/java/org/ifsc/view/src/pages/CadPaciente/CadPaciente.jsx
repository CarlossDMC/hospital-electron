// src/pages/CadPaciente.jsx
import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";

export default function CadPaciente() {
    const registerFields = [
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do paciente",
            required: true,
        },
        {
            name: "age",
            label: "Idade",
            type: "number",
            placeholder: "Digite a idade",
            required: true,
        },
        {
            name: "cpf",
            label: "CPF",
            type: "text",
            placeholder: "Digite o CPF do paciente",
            required: true,
        },
        {
            name: "rg",
            label: "RG",
            type: "text",
            placeholder: "Digite o RG do paciente",
            required: true,
        },
        {
            name: "phone",
            label: "Telefone",
            type: "text",
            placeholder: "Digite o telefone do paciente",
            required: true,
        },
        {
            name: "cellphone",
            label: "Celular",
            type: "text",
            placeholder: "Digite o celular do paciente",
            required: false,
        },
        {
            name: "gender",
            label: "Gênero",
            type: "select",
            options: [
                { label: "Masculino", value: "Masculino" },
                { label: "Feminino", value: "Feminino" },
                { label: "Outro", value: "Outro" },
            ],
            placeholder: "Selecione o gênero",
            required: true,
        },
        {
            name: "bloodType",
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
            name: "socialName",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social do paciente",
            required: false,
        },
        {
            name: "cep",
            label: "CEP",
            type: "text",
            placeholder: "Digite o CEP",
            required: true,
        },
        {
            name: "city",
            label: "Cidade",
            type: "text",
            placeholder: "Digite a cidade",
            required: true,
        },
        {
            name: "neighborhood",
            label: "Bairro",
            type: "text",
            placeholder: "Digite o bairro",
            required: true,
        },
        {
            name: "address",
            label: "Logradouro",
            type: "text",
            placeholder: "Digite o logradouro",
            required: true,
        },
        {
            name: "complement",
            label: "Complemento",
            type: "text",
            placeholder: "Digite o complemento",
            required: false,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do paciente",
            required: true,
        },
    ];

    const endpoint = "https://api.exemplo.com/patients"; // Substitua pelo seu endpoint real
    const successPath = "/PesPaciente"; // Atualizado para refletir a rota correta

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Paciente</h1>
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
