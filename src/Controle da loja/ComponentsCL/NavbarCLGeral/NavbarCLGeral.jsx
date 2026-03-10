import React from "react";
import "./navbarCLGeral.css";

export default function NavbarSimples() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-right">
        <a href="/funcionarios">Funcionário</a>
        <a href="/agenda">Agenda</a>
        <a href="/galeria">Galeria</a>
      </div>
    </nav>
  );
}