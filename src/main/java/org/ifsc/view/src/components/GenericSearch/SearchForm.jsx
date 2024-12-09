import React from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

export default function SearchForm({ fields, onSearch, loading, registerPath }) {
    const [formData, setFormData] = React.useState({});

    const clearNonDigits = (value) => value.replace(/\D/g, "");
    const getCpfCnpjMask = (value) => {
        const digits = clearNonDigits(value);
        return digits.length <= 11 ? "999.999.999-99" : "99.999.999/9999-99";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e && e.preventDefault && e.preventDefault();
        onSearch(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => {
                    if (field.name === "cpf_cnpj") {
                        // Campo de CPF/CNPJ com máscara dinâmica
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <InputMask
                                    mask={getCpfCnpjMask(formData[field.name] || "")}
                                    maskChar=""
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    onInput={handleSubmit}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={field.placeholder || ""}
                                />
                            </div>
                        );
                    } else if (field.type === "select") {
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <select
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onClick={handleSubmit}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">{field.placeholder || "Selecione"}</option>
                                    {field.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    } else {
                        return (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type || "text"}
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={handleChange}
                                    onInput={handleSubmit}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={field.placeholder || ""}
                                />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                {registerPath && (
                    <Link
                        to={registerPath}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Cadastrar
                    </Link>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>
        </form>
    );
}
