// src/components/GenericSearch/SearchForm.jsx
import React from "react";

export default function SearchForm({ fields, onSearch, loading }) {
    const [formData, setFormData] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder={field.placeholder || ""}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-end">
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