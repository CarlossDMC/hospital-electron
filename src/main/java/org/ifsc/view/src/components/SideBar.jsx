// src/components/SideBar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserPlus, FaBars } from "react-icons/fa";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: "Home", path: "/", icon: <FaHome /> },
        { name: "Cadastrar Paciente", path: "/CadPaciente", icon: <FaUserPlus /> },
        // Adicione mais itens conforme necessário
    ];

    return (
        <div className={`bg-green-600 text-white ${isOpen ? "w-64" : "w-20"} transition-width duration-300 flex flex-col`}>
            <div className="flex items-center justify-between p-4">
                {isOpen && <span className="text-lg font-semibold">Meu App</span>}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <FaBars />
                </button>
            </div>
            <nav className="flex-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center p-4 hover:bg-green-700 transition-colors ${
                                isActive ? "bg-green-700" : ""
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isOpen && <span className="ml-4">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
