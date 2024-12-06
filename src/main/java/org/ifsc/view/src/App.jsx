// src/App.jsx
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import PesPaciente from "./pages/PesPaciente/PesPaciente.jsx";
import PesAcompanhante from "./pages/PesAcompanhante/PesAcompanhante.jsx";
import PesEnfermeiro from "./pages/PesEnfermeiro/PesEnfermeiro.jsx";
import PesFarmaceutico from "./pages/PesFarmaceutico/PesFarmaceutico.jsx";
import PesMedico from "./pages/PesMedico/PesMedico.jsx";
import PesUsuario from "./pages/PesUsuario/PesUsuario.jsx";
import CadAcompanhante from "./pages/CadAcompanhante/CadAcompanhante.jsx"; // Importe o componente de cadastro
import CadEnfermeiro from "./pages/CadEnfermeiro/CadEnfermeiro.jsx";
import CadFarmaceutico from "./pages/CadFarmaceutico/CadFarmaceutico.jsx";
import CadMedico from "./pages/CadMedico/CadMedico.jsx";
import CadUsuario from "./pages/CadUsuario/CadUsuario.jsx";
import SideBar from "./components/SideBar.jsx";
import CadPaciente from "./pages/CadPaciente/CadPaciente.jsx";
import {ToastContainer, Bounce} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Router>
            <div className="flex h-screen">

                <SideBar />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer />
                <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/CadPaciente" element={<CadPaciente />} />
                        <Route path="/PesPaciente" element={<PesPaciente />} />
                        <Route path="/PesAcompanhante" element={<PesAcompanhante />} />
                        <Route path="/PesEnfermeiro" element={<PesEnfermeiro />} />
                        <Route path="/PesFarmaceutico" element={<PesFarmaceutico />} />
                        <Route path="/PesMedico" element={<PesMedico />} />
                        <Route path="/PesUsuario" element={<PesUsuario />} />
                        <Route path="/CadAcompanhante" element={<CadAcompanhante />} />
                        <Route path="/CadEnfermeiro" element={<CadEnfermeiro />} />
                        <Route path="/CadFarmaceutico" element={<CadFarmaceutico />} />
                        <Route path="/CadMedico" element={<CadMedico />} />
                        <Route path="/CadUsuario" element={<CadUsuario />} />
                        {/* Adicione mais rotas conforme necessário */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
