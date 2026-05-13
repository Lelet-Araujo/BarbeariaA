import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Controle da loja/ComponentsCL/NavbarCL/navbarCL";
import CardCadastro from "./2Components/CardCadastro/Cardcadastro";
import CardAgendamento from "./2Components/CardAgendamentoLoja/CardAgendaLoja";


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