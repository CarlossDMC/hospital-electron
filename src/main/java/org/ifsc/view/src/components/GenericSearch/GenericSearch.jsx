// src/components/GenericSearch/GenericSearch.jsx
import React, { useState } from "react";
import axios from "axios"; // Certifique-se de instalar o axios: npm install axios
import SearchForm from "./SearchForm";
import ResultsTable from "./ResultsTable";

export default function GenericSearch({ fields, endpoint, columns }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(endpoint, { params: formData });
            setData(response.data);
        } catch (err) {
            setError("Ocorreu um erro durante a busca.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <SearchForm fields={fields} onSearch={handleSearch} loading={loading} />
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}
            <ResultsTable columns={columns} data={data} />
        </div>
    );
}
