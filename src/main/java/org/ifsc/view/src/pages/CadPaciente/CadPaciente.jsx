import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";


export default function CadPaciente() {
    const registerFields = [
        {
            name: "name",
            label: "Nome",
            type: "text",
            placeholder: "Digite o nome do paciente",
        },
        {
            name: "age",
            label: "Idade",
            type: "number",
            placeholder: "Digite a idade",
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
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Digite o email do paciente",
        },

    ];

    const endpoint = "https://api.exemplo.com/patients";
    const successPath = "/SearchPatients";

    return (
        <div className="container mx-auto">
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
