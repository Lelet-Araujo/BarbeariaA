import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeWC from "./webClient/HomeWC";
import AgendaPage from "./Controle da loja/Agenda";
import FuncionarioPage from "./Controle da loja/Funcionarios";
import AdmHome from "./ADM/AdmHome";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWC />} />
      <Route path="/agenda" element={<AgendaPage />} />
      <Route path="/funcionarios" element={<FuncionarioPage />} />
      <Route path="/adm" element={<AdmHome />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

