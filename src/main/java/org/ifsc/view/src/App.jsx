// src/App.jsx
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import CadPaciente from "./pages/CadPaciente/CadPaciente.jsx";
import SideBar from "./components/SideBar.jsx";
import PesPaciente from "./pages/PesPaciente/PesPaciente.jsx";

export default function App() {
    return (
        <Router>
            <div className="flex h-screen">
                <SideBar />
                <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/CadPaciente" element={<CadPaciente />} />
                        <Route path="/PesPaciente" element={<PesPaciente />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
