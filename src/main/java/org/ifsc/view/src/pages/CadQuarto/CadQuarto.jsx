import React, { useEffect, useState } from "react";
import GenericRegister from "../../components/GenericRegister/GenericRegister.jsx";
import { useParams } from "react-router-dom";

export default function CadQuarto() {
    const { id } = useParams();
    const [alas, setAlas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/ala")
            .then((res) => res.json())
            .then((data) => setAlas(data));
    }, []);

    const registerFields = [
        { name: "descricao", label: "Descrição", type: "text", required: true, width: "60%" },
        { name: "status", label: "Status", type: "select", options: [{ label: "Ativo", value: "Ativo" }, { label: "Inativo", value: "Inativo" }], required: true, width: "30%" },
        { name: "alaId", label: "Ala", type: "select", options: alas.map(ala => ({ label: ala.descricao, value: ala.id })), required: true, width: "50%" }
    ];

    return (
        <GenericRegister fields={registerFields} endpoint="http://localhost:8000/quarto" successPath="/PesQuarto" id={id || 0} entidade={"Quarto"} />
    );
}
