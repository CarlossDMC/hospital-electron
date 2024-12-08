import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function SearchPatients() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do paciente" },
        { name: "cpf_cnpj", label: "CPF/CNPJ", type: "text", placeholder: "Digite o CPF ou CNPJ" },
        { name: "email", label: "Email", type: "email", placeholder: "Digite o email do paciente" },
        { name: "cidade", label: "Cidade", type: "text", placeholder: "Digite a cidade" },
        {
            name: "tipo_sanguineo",
            label: "Tipo Sanguíneo",
            type: "select",
            placeholder: "Selecione o tipo sanguíneo",
            options: [
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" },
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
            ],
        },
        {
            name: "sexo",
            label: "Sexo",
            type: "select",
            placeholder: "Selecione o sexo",
            options: [
                { value: "Masculino", label: "Masculino" },
                { value: "Feminino", label: "Feminino" },
            ],
        },
    ];


    const tableColumns = [
        { header: "ID", accessor: "id", width: "50px" },
        { header: "Nome", accessor: "nome", width: "200px" },
        { header: "Telefone", accessor: "fone1", width: "150px" },
        { header: "Celular", accessor: "fone2", width: "150px" },
        { header: "Email", accessor: "email", width: "250px" },
        { header: "CPF/CNPJ", accessor: "cpfCnpj", width: "180px" },
        { header: "RG", accessor: "rgInscricaoEstadual", width: "150px" },
        { header: "CEP", accessor: "cep", width: "100px" },
        { header: "Cidade", accessor: "cidade", width: "150px" },
        { header: "Bairro", accessor: "bairro", width: "150px" },
        { header: "Logradouro", accessor: "logradouro", width: "200px" },
        { header: "Complemento", accessor: "complemento", width: "150px" },
        { header: "Tipo Sanguíneo", accessor: "tipoSanguineo", width: "120px" },
        { header: "Sexo", accessor: "sexo", width: "100px" },
        { header: "Nome Social", accessor: "nomeSocial", width: "200px" },
    ];


    const endpoint = "http://localhost:8000/paciente";
    const registerPath = "/CadPaciente";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Pacientes</h1>
            <GenericSearch
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
                idAcess={'id'}
            />
        </div>
    );
}
