import React from "react";
import {useNavigate} from "react-router-dom";

export default function ResultsTable({ columns, data, registerPath, idAcess }) {

    const navigate = useNavigate();

    const handleCellClick = (row) => {
        const editUrl = `${registerPath}/${row[idAcess]}`;
        navigate(editUrl);
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow table-fixed">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.accessor}
                            style={{ width: col.width || "auto" }}
                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="px-6 py-4 text-center text-gray-500"
                        >
                            Nenhum resultado encontrado.
                        </td>
                    </tr>
                ) : (
                    data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            {columns.map((col) => (
                                <td
                                    key={col.accessor}
                                    style={{ width: col.width || "auto" }}
                                    onClick={() => handleCellClick(row)}
                                    className="px-6 py-4 border-b border-gray-200 truncate cursor-pointer"
                                >
                                    {row[col.accessor]}
                                </td>

                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
