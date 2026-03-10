import React from "react";
import { Link } from "react-router-dom";
import "./navbarCLGeral.css";

export default function NavbarSimples() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>

      <div className="navbar-right">
        <Link to="/funcionarios">Funcionário</Link>
        <Link to="/agenda">Agenda</Link>
        <Link to="/galeria">Galeria</Link>
      </div>
    </nav>
  );
}