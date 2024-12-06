import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function SearchPatients() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do paciente" },
        { name: "cpfCnpj", label: "CPF/CNPJ", type: "text", placeholder: "Digite o CPF ou CNPJ" },
        { name: "email", label: "Email", type: "email", placeholder: "Digite o email do paciente" },
        { name: "cidade", label: "Cidade", type: "text", placeholder: "Digite a cidade" },
        { name: "tipoSanguineo", label: "Tipo Sanguíneo", type: "text", placeholder: "Digite o tipo sanguíneo" },
        { name: "sexo", label: "Sexo", type: "text", placeholder: "Digite o sexo" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id", width: "50px" },
        { header: "Nome", accessor: "nome", width: "300px" },
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
            />
        </div>
    );
}
