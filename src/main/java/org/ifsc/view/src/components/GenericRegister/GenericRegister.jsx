import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import InputMask from "react-input-mask";
import { Bounce, toast } from "react-toastify";

export default function GenericRegister({
                                            fields,
                                            endpoint,
                                            successPath,
                                            onSuccess,
                                            onError,
                                            entidade,
                                            initialData,
                                            id = 0,
                                        }) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [cepError, setCepError] = useState(null);
    const [isFetchingCep, setIsFetchingCep] = useState(false);

    const watchedCep = watch("cep");

    // Estado para armazenar o valor do CPF/CNPJ
    const [cpfCnpjValue, setCpfCnpjValue] = useState("");

    const clearNonDigits = (value) => value.replace(/\D/g, "");

    const getCpfCnpjMask = (value) => {
        const digits = clearNonDigits(value);
        // Até 11 dígitos -> CPF, acima -> CNPJ
        return digits.length <= 11 ? "999.999.999-99" : "99.999.999/9999-99";
    };

    useEffect(() => {
        if (id && id !== 0) {
            setLoading(true);
            axios
                .get(`${endpoint}/${id}`)
                .then((response) => {
                    const normalizedData = Object.fromEntries(
                        Object.entries(response.data).map(([key, value]) => [key, value ?? ""])
                    );
                    reset(normalizedData);
                    if (normalizedData.cpfCnpj) {
                        setCpfCnpjValue(normalizedData.cpfCnpj);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar os dados:", error);
                    setServerError("Erro ao buscar os dados para edição.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id, endpoint, reset]);

    const handleDelete = async (e) => {
        e.preventDefault();
        navigate(successPath);
        await axios.delete(`${endpoint}/${id}`);
        toast.success(`${entidade} deletado(a) com sucesso!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const handleCepBlur = async (e) => {
        const cep = e.target.value.replace(/\D/g, "");

        if (cep.length !== 8 || !cep) {
            setCepError("CEP inválido. Deve conter 8 dígitos.");
            setValue("cidade", "");
            setValue("bairro", "");
            setValue("logradouro", "");
            setValue("complemento", "");
            return;
        }

        setIsFetchingCep(true);
        setCepError(null);

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data.erro) {
                setCepError("CEP não encontrado.");
                setValue("cidade", "");
                setValue("bairro", "");
                setValue("logradouro", "");
                setValue("complemento", "");
            } else {
                setValue("cidade", response.data.localidade || "");
                setValue("bairro", response.data.bairro || "");
                setValue("logradouro", response.data.logradouro || "");
                setValue("complemento", response.data.complemento || "");
                setCepError(null);
            }
        } catch (error) {
            setCepError("Erro ao buscar o CEP.");
            setValue("cidade", "");
            setValue("bairro", "");
            setValue("logradouro", "");
            setValue("complemento", "");
        } finally {
            setIsFetchingCep(false);
        }
    };

    const handleCpfCnpjChange = (e) => {
        const newValue = e.target.value;
        setCpfCnpjValue(newValue);
        setValue("cpfCnpj", newValue);
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
            reset();
            toast.success(`${entidade} salvo(a) com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
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
                <div className="flex flex-wrap gap-4">
                    {fields.map((field) => {
                        if (field.name === "cpfCnpj") {
                            return (
                                <div
                                    key={field.name}
                                    style={{
                                        width: field.width || "100%",
                                        flex: `0 0 ${field.width || "100%"}`,
                                    }}
                                >
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                        {field.required && <span className="text-red-600"> *</span>}
                                    </label>
                                    <InputMask
                                        mask={getCpfCnpjMask(cpfCnpjValue)}
                                        maskChar=""
                                        value={cpfCnpjValue}
                                        onChange={handleCpfCnpjChange}
                                        disabled={field.disabled || false}
                                        className={`mt-1 block w-full border ${
                                            errors[field.name] ? "border-red-500" : "border-gray-300"
                                        } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder={field.placeholder || ""}
                                    />
                                    {errors[field.name] && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors[field.name].type === "required"
                                                ? `${field.label} é obrigatório.`
                                                : errors[field.name].message}
                                        </p>
                                    )}
                                </div>
                            );
                        } else if (field.name === "cep") {
                            return (
                                <div
                                    key={field.name}
                                    style={{
                                        width: field.width || "100%",
                                        flex: `0 0 ${field.width || "100%"}`,
                                    }}
                                >
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                        {field.required && <span className="text-red-600"> *</span>}
                                    </label>
                                    <InputMask
                                        mask="99999-999"
                                        maskChar=""
                                        {...register(field.name, { required: field.required })}
                                        onBlur={handleCepBlur}
                                        disabled={field.disabled || false}
                                        className={`mt-1 block w-full border ${
                                            cepError ? "border-red-500" : "border-gray-300"
                                        } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder={field.placeholder || ""}
                                    />
                                    {errors[field.name] && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors[field.name].type === "required"
                                                ? `${field.label} é obrigatório.`
                                                : errors[field.name].message}
                                        </p>
                                    )}
                                </div>
                            );
                        } else if (field.type === "select") {
                            return (
                                <div
                                    key={field.name}
                                    style={{
                                        width: field.width || "100%",
                                        flex: `0 0 ${field.width || "100%"}`,
                                    }}
                                >
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                        {field.required && <span className="text-red-600"> *</span>}
                                    </label>
                                    <select
                                        {...register(field.name, { required: field.required })}
                                        disabled={field.disabled || false}
                                        className={`mt-1 block w-full border ${
                                            errors[field.name] ? "border-red-500" : "border-gray-300"
                                        } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    >
                                        <option value="">{field.placeholder || "Selecione"}</option>
                                        {field.options &&
                                            field.options.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                    </select>
                                    {errors[field.name] && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors[field.name].type === "required"
                                                ? `${field.label} é obrigatório.`
                                                : errors[field.name].message}
                                        </p>
                                    )}
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={field.name}
                                    style={{
                                        width: field.width || "100%",
                                        flex: `0 0 ${field.width || "100%"}`,
                                    }}
                                >
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                        {field.required && <span className="text-red-600"> *</span>}
                                    </label>
                                    <input
                                        type={field.type || "text"}
                                        {...register(field.name, { required: field.required })}
                                        disabled={field.disabled || false}
                                        className={`mt-1 block w-full border ${
                                            errors[field.name] ? "border-red-500" : "border-gray-300"
                                        } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                            field.disabled ? "bg-slate-100 cursor-not-allowed" : ""
                                        }`}
                                        placeholder={field.placeholder || ""}
                                    />
                                    {errors[field.name] && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors[field.name].type === "required"
                                                ? `${field.label} é obrigatório.`
                                                : errors[field.name].message}
                                        </p>
                                    )}
                                </div>
                            );
                        }
                    })}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 flex items-center"
                    >
                        {loading && <FaSpinner className="animate-spin mr-2" />}
                        {loading ? "Salvando..." : "Salvar"}
                    </button>

                    {id !== 0 && (
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 flex items-center"
                        >
                            {loading && <FaSpinner className="animate-spin mr-2" />}
                            {loading ? "Excluindo..." : "Excluir"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
