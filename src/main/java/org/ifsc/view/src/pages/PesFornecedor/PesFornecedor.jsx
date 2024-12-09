import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesFornecedor() {
    const searchFields = [
        { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome do fornecedor" },
        { name: "nome_fantasia", label: "Nome Fantasia", type: "text", placeholder: "Digite o nome fantasia" },
        { name: "cpf_cnpj", label: "CPF/CNPJ", type: "text", placeholder: "Digite o CPF ou CNPJ" },
        { name: "email", label: "Email", type: "email", placeholder: "Digite o email do fornecedor" },
        { name: "cidade", label: "Cidade", type: "text", placeholder: "Digite a cidade" },
        { name: "contato", label: "Contato", type: "text", placeholder: "Digite o nome do contato" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id", width: "50px" },
        { header: "Nome", accessor: "nome", width: "200px" },
        { header: "Nome Fantasia", accessor: "nomeFantasia", width: "200px" },
        { header: "Telefone", accessor: "fone1", width: "150px" },
        { header: "Celular", accessor: "fone2", width: "150px" },
        { header: "Email", accessor: "email", width: "250px" },
        { header: "CPF/CNPJ", accessor: "cpfCnpj", width: "180px" },
        { header: "RG/Inscrição Estadual", accessor: "rgInscricaoEstadual", width: "200px" },
        { header: "CEP", accessor: "cep", width: "100px" },
        { header: "Cidade", accessor: "cidade", width: "150px" },
        { header: "Bairro", accessor: "bairro", width: "150px" },
        { header: "Logradouro", accessor: "logradouro", width: "200px" },
        { header: "Complemento", accessor: "complemento", width: "150px" },
        { header: "Contato", accessor: "contato", width: "150px" },
    ];

    const endpoint = "http://localhost:8000/fornecedor";
    const registerPath = "/CadFornecedor";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Fornecedores</h1>
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
