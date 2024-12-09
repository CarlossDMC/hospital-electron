import React from "react";
import GenericSearch from "../../components/GenericSearch/GenericSearch.jsx";

export default function PesUsuario() {
    const searchFields = [
        { name: "nome", label: "Usuário", type: "text", placeholder: "Digite o nome de usuário" },
        { name: "email", label: "Email", type: "email", placeholder: "Digite o email" },
    ];

    const tableColumns = [
        { header: "ID", accessor: "id" },
        { header: "Usuário", accessor: "nome" },
        { header: "Email", accessor: "email" },
        { header: "Fone", accessor: "fone1" },
    ];

    const endpoint = "http://localhost:8000/usuario";
    const registerPath = "/CadUsuario";

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Pesquisar Usuários do Sistema</h1>
            <GenericSearch
                idAcess={"id"}
                fields={searchFields}
                endpoint={endpoint}
                columns={tableColumns}
                registerPath={registerPath}
            />
        </div>
    );
}
