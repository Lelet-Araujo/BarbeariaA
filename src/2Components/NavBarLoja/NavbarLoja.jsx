import React from "react";
import { Link } from "react-router-dom";
import "./NavbarLoja.css";

export default function NavbarSimples() {
  return (
    <nav className="navbar-loja">
      <div className="navbar-loja-logo">Logo</div>

      <div className="navbar-loja-right">
        <Link to="/funcionarios">Funcionário</Link>
        <Link to="/agenda">Agenda</Link>
      </div>
    </nav>
  );
}
