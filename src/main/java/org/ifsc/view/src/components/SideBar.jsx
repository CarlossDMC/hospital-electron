// src/components/SideBar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserPlus, FaBars, FaUserMd, FaUserNurse, FaUserTie, FaUserSecret, FaUserFriends, FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const menuItems = [
        { name: "Home", path: "/", icon: <FaHome /> },
        {
            name: "Pessoas",
            icon: <FaUserPlus />,
            subItems: [
                { name: "Paciente", path: "/PesPaciente", icon: <FaUserFriends /> },
                { name: "Médico", path: "/PesMedico", icon: <FaUserMd /> },
                { name: "Acompanhante", path: "/PesAcompanhante", icon: <FaUserFriends /> },
                { name: "Enfermeiro", path: "/PesEnfermeiro", icon: <FaUserNurse /> },
                { name: "Farmacêutico", path: "/PesFarmaceutico", icon: <FaUserTie /> },
                { name: "Usuário do Sistema", path: "/PesUsuario", icon: <FaUserSecret /> },
            ],
        },
    ];

    return (
        <div className={`bg-green-600 text-white ${isOpen ? "w-64" : "w-20"} transition-width duration-300 flex flex-col h-full`}>
            {/* Cabeçalho da Sidebar */}
            <div className="flex items-center justify-between p-4">
                {isOpen && <span className="text-lg font-semibold">Meu App</span>}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <FaBars />
                </button>
            </div>

            {/* Navegação */}
            <nav className="flex-1 overflow-y-auto">
                {menuItems.map((item) => {
                    if (item.subItems) {
                        const isActive = dropdownOpen;
                        return (
                            <div key={item.name}>
                                <button
                                    onClick={toggleDropdown}
                                    className={`flex items-center w-full p-4 hover:bg-green-700 transition-colors focus:outline-none ${isActive ? "bg-green-700" : ""}`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {isOpen && (
                                        <span className="ml-4 flex-1 text-left">
                                            {item.name}
                                        </span>
                                    )}
                                    {isOpen && (
                                        <span className="ml-auto">
                                            {isActive ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                    )}
                                </button>
                                {/* Sub-itens do Dropdown */}
                                {isActive && item.subItems.map((subItem) => {
                                    const isSubActive = location.pathname === subItem.path;
                                    return (
                                        <Link
                                            key={subItem.name}
                                            to={subItem.path}
                                            className={`flex items-center pl-12 p-2 hover:bg-green-700 transition-colors ${isSubActive ? "bg-green-700" : ""}`}
                                        >
                                            <span className="text-lg">{subItem.icon}</span>
                                            {isOpen && <span className="ml-4">{subItem.name}</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        );
                    }

                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center p-4 hover:bg-green-700 transition-colors ${isActive ? "bg-green-700" : ""}`}
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
