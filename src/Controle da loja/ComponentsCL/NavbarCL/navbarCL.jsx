import React, { useState } from "react";
import "./navbarCL.css";
import CardCadastro from "../CardCadastroCL/CardCadastroCL";
import CardAgendaCL from "../CardAgendamentoCL/CardAgendaCL"; // importe seu card de agendamento

export default function NavBar() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Logo</div>

        <div className="navbar-buttons">
          <button
            className="agendar-button"
            onClick={() => setMostrarAgendamento(true)}
          >
            Agendar
          </button>

          <button
            className="login-button"
            onClick={() => setMostrarLogin(true)}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Card de Login */}
      {mostrarLogin && (
        <CardOverlay onClose={() => setMostrarLogin(false)}>
          <CardCadastro />
        </CardOverlay>
      )}

      {/* Card de Agendamento */}
      {mostrarAgendamento && (
        <CardOverlay onClose={() => setMostrarAgendamento(false)}>
          <CardAgendaCL />
        </CardOverlay>
      )}
    </>
  );
}

function CardOverlay({ children, onClose }) {
  const [animar, setAnimar] = useState(false);

  React.useEffect(() => {
    setAnimar(true);
  }, []);

  const handleClose = () => {
    setAnimar(false);
    setTimeout(onClose, 400);
  };

  return (
    <div className="overlay">
      <div className={`card-wrapper ${animar ? "zoom-in" : "zoom-out"}`}>
        {React.cloneElement(children, { onClose: handleClose })}
      </div>
    </div>
  );
}