import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ fields, onSubmit, loading }) {
    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Limpa o erro do campo ao alterar o valor
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validate = () => {
        const newErrors = {};
        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} é obrigatório.`;
            }
            // Adicione outras validações conforme necessário
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    const handleBack = () => {
        navigate(-1); // Retorna à página anterior
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>
                        {field.type === "select" ? (
                            <select
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${
                                    errors[field.name] ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            >
                                <option value="">Selecione</option>
                                {field.options && field.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${
                                    errors[field.name] ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder={field.placeholder || ""}
                            />
                        )}
                        {errors[field.name] && (
                            <p className="mt-1 text-xs text-red-600">{errors[field.name]}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Voltar
                </button>
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
    );
}
