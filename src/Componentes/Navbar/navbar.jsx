import React, { useState } from "react";
import "./navbar.css";
import CardCadastro from "../CardCadastro/CardCadastro";

export default function NavBar() {
  const [mostrarCard, setMostrarCard] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Logo</div>
        <button className="login-button" onClick={() => setMostrarCard(true)}>
          Login
        </button>
      </nav>

      {mostrarCard && (
        <CardOverlay onClose={() => setMostrarCard(false)}>
          <CardCadastro />
        </CardOverlay>
      )}
    </>
  );
}

function CardOverlay({ children, onClose }) {
  const [animar, setAnimar] = useState(false);

  React.useEffect(() => {
    setAnimar(true); // inicia animação de entrada
  }, []);

  const handleClose = () => {
    setAnimar(false);           // inicia animação de saída
    setTimeout(onClose, 400);   // espera a transição terminar antes de remover
  };

  return (
    <div className="overlay">
      <div className={`card-wrapper ${animar ? "zoom-in" : "zoom-out"}`}>
        {/* Passa handleClose para o ícone */}
        {React.cloneElement(children, { onClose: handleClose })}
      </div>
    </div>
  );
}