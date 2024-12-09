import React from "react";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white flex flex-col m-0 p-0">
            <header className="w-full bg-green-600 text-white py-4 px-8">
                <h1 className="text-2xl font-bold">Dashboard - IFSC HOSPITAL</h1>
                <p className="text-sm">Sistema de Gerenciamento Hospitalar</p>
            </header>

            <main className="flex-1 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="bg-green-100 border border-green-300 p-6 rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold">Pacientes</h2>
                        <p className="text-3xl font-bold">256</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-green-100 border border-green-300 p-6 rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold">Consultas</h2>
                        <p className="text-3xl font-bold">102</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-green-100 border border-green-300 p-6 rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold">Médicos</h2>
                        <p className="text-3xl font-bold">45</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-green-100 border border-green-300 p-6 rounded-md shadow-sm">
                        <h2 className="text-lg font-semibold">Enfermeiros</h2>
                        <p className="text-3xl font-bold">89</p>
                    </div>
                </div>
            </main>

        </div>
    );
}
