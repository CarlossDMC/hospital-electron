import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import {useParams} from "react-router-dom";

export default function CadAcompanhante() {
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
            placeholder: "Digite o nome do acompanhante",
            required: true,
            width: "55%",
        },
        {
            name: "grauParentesco",
            label: "Grau de Parentesco",
            type: "text",
            placeholder: "Digite o grau de parentesco",
            required: true,
            width: "30%",
        },
        {
            name: "cpf",
            label: "CPF",
            type: "text",
            placeholder: "Digite o CPF do acompanhante",
            required: true,
            width: "55%",
        },
        {
            name: "fone",
            label: "Telefone",
            type: "text",
            placeholder: "Digite o telefone do acompanhante",
            required: true,
            width: "41.5%",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do acompanhante",
            required: true,
            width: "65%",
        },
        {
            name: "status",
            label: "Status",
            type: "select",
            options: [
                { label: "Ativo", value: "Ativo" },
                { label: "Desativo", value: "Inativo" },
            ],
            placeholder: "Selecione o status do acompanhante",
            required: true,
            width: "31.5%",
        },
    ];

    const endpoint = "http://localhost:8000/acompanhante";
    const successPath = "/PesAcompanhante";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Cadastrar Acompanhante</h1>
            <GenericRegister
                fields={registerFields}
                endpoint={endpoint}
                successPath={successPath}
                id={id || 0}
                onSuccess={() => {}}
                entidade={"Acompanhante"}
            />
        </div>
    );
}
