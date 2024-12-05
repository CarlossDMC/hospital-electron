import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm.jsx";
import { useNavigate } from "react-router-dom";

export default function GenericRegister({ fields, endpoint, successPath, onSuccess, onError }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(endpoint, formData);
            setSuccess(true);
            if (onSuccess) {
                onSuccess(response.data);
            }
            if (successPath) {
                navigate(successPath);
            }
        } catch (err) {
            setError("Ocorreu um erro ao salvar os dados.");
            console.error(err);
            if (onError) {
                onError(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                    Cadastro realizado com sucesso!
                </div>
            )}
            <RegisterForm
                fields={fields}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}
