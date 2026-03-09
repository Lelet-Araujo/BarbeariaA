import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Componentes/Navbar/navbar";
import CardCadastro from "./pages/CardCadastro/CardCadastro";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<CardCadastro />} />
      </Routes>
    </>
  );
}