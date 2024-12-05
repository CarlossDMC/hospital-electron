// src/components/GenericRegister/GenericRegister.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import InputMask from "react-input-mask";

export default function GenericRegister({ fields, endpoint, successPath, onSuccess, onError }) {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();

    const [loading, setLoading] = React.useState(false);
    const [serverError, setServerError] = React.useState(null);
    const [cepError, setCepError] = React.useState(null);
    const [isFetchingCep, setIsFetchingCep] = React.useState(false);

    const watchedCep = watch("cep"); // Nome do campo CEP

    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length !== 8) {
            setCepError("CEP inválido. Deve conter 8 dígitos.");
            setValue("city", "");
            setValue("neighborhood", "");
            setValue("address", "");
            setValue("complement", "");
            return;
        }

        setIsFetchingCep(true);
        setCepError(null);

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            alert(response)
            if (response.data.erro) {
                setCepError("CEP não encontrado.");
                setValue("city", "");
                setValue("neighborhood", "");
                setValue("address", "");
                setValue("complement", "");
            } else {
                setValue("city", response.data.localidade || "");
                setValue("neighborhood", response.data.bairro || "");
                setValue("address", response.data.logradouro || "");
                setValue("complement", response.data.complemento || "");
                setCepError(null);
            }
        } catch (error) {
            setCepError("Erro ao buscar o CEP.");
            alert(error);
            // Limpar os campos de endereço
            setValue("city", "");
            setValue("neighborhood", "");
            setValue("address", "");
            setValue("complement", "");
        } finally {
            setIsFetchingCep(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        try {
            const response = await axios.post(endpoint, data);
            if (onSuccess) {
                onSuccess(response.data);
            }
            navigate(successPath);
            reset(); // Limpa o formulário após o sucesso
        } catch (error) {
            // Verificar se o backend retornou erros específicos
            if (error.response && error.response.data && error.response.data.message) {
                setServerError(error.response.data.message);
            } else {
                setServerError("Ocorreu um erro ao salvar os dados.");
            }
            console.error(error);
            if (onError) {
                onError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {serverError && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {serverError}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.name === "cep" ? (
                                <InputMask
                                    mask="99999-999"
                                    {...register(field.name)}
                                    onBlur={handleCepBlur}
                                    className={`mt-1 block w-full border ${
                                        cepError ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder={field.placeholder || ""}
                                />
                            ) : field.type === "select" ? (
                                <select
                                    {...register(field.name)}
                                    className={`mt-1 block w-full border ${
                                        errors[field.name] ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                >
                                    <option value="">{field.placeholder || "Selecione"}</option>
                                    {field.options && field.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type || "text"}
                                    {...register(field.name)}
                                    className={`mt-1 block w-full border ${
                                        errors[field.name] ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder={field.placeholder || ""}
                                />
                            )}
                            {/* Exibição de erros específicos por campo, se necessário */}
                            {field.name === "cep" && cepError && (
                                <p className="mt-1 text-xs text-red-600">{cepError}</p>
                            )}
                            {errors[field.name] && field.name !== "cep" && (
                                <p className="mt-1 text-xs text-red-600">{errors[field.name].message}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 flex items-center"
                    >
                        {loading && <FaSpinner className="animate-spin mr-2" />}
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
