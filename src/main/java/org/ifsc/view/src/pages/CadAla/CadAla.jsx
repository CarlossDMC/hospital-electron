import React from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import { useParams } from "react-router-dom";

export default function CadAla() {
    const { id } = useParams();
    const registerFields = [
        { name: "descricao", label: "Descrição", type: "text", required: true, width: "60%" },
        { name: "status", label: "Status", type: "select", options: [{ label: "Ativo", value: "Ativo" }, { label: "Inativo", value: "Inativo" }], required: true, width: "30%" }
    ];

    return (
        <GenericRegister fields={registerFields} endpoint="http://localhost:8000/ala" successPath="/PesAla" id={id || 0} entidade={"Ala"} />
    );
}
