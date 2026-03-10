import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Controle da loja/ComponentsCL/NavbarCL/navbarCL";
import CardCadastro from "./Controle da loja/ComponentsCL/CardCadastroCL/CardCadastroCL";
import CardAgendamento from "./Controle da loja/ComponentsCL/CardAgendamentoCL/CardAgendaCL";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<CardCadastro />} />
        <Route path="/agendar" element={<CardAgendamento />} />
      </Routes>
    </>
  );
}