import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import { Bounce, toast } from "react-toastify";
import {useParams} from "react-router-dom";

export default function CadPaciente() {
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
            placeholder: "Digite o nome do paciente",
            required: true,
            width: "60%",
        },
        {
            name: "fone1",
            label: "Telefone Fixo",
            type: "text",
            placeholder: "Digite o telefone fixo",
            required: true,
            width: "25%",
        },
        {
            name: "fone2",
            label: "Telefone Celular",
            type: "text",
            placeholder: "Digite o telefone celular",
            required: false,
            width: "30%",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do paciente",
            required: true,
            width: "30%",
        },
        {
            name: "cpfCnpj",
            label: "CPF",
            type: "text",
            placeholder: "Digite o CPF do paciente",
            required: true,
            width: "35%",
        },
        {
            name: "rgInscricaoEstadual",
            label: "RG/Inscrição Estadual",
            type: "text",
            placeholder: "Digite o RG ou inscrição estadual",
            required: true,
            width: "35%",
        },
        {
            name: "cep",
            label: "CEP",
            type: "text",
            placeholder: "Digite o CEP",
            required: true,
            width: "30%"
        },
        {
            name: "cidade",
            label: "Cidade",
            type: "text",
            placeholder: "Digite a cidade",
            required: true,
            width: "30%"
        },
        {
            name: "bairro",
            label: "Bairro",
            type: "text",
            placeholder: "Digite o bairro",
            required: true,
            width: "30%"
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
            width: "35%",
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
            width: "30%",
        },
        {
            name: "nomeSocial",
            label: "Nome Social",
            type: "text",
            placeholder: "Digite o nome social (opcional)",
            required: false,
            width: "30%",
        },
    ];

    const endpoint = "http://localhost:8000/paciente";
    const successPath = "/PesPaciente";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Paciente</h1>
            <GenericRegister
                fields={registerFields}
                entidade={'Paciente'}
                endpoint={endpoint}
                successPath={successPath}
                id={id || 0}
                onSuccess={() => {}}
            />
        </div>
    );
}
