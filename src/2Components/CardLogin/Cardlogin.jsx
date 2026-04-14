import React, { useState } from "react";
import "../CardLogin/Cardlogin.css";

import user from "../../1Assets/user.png";
import closeIcon from "../../1Assets/close.png";
import hide from "../../1Assets/hide.png";
import show from "../../1Assets/show.png";

export default function LoginCard({ onClose }) {
  const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false);
  const fecharModal = () => {
    onClose?.();
  };

  return (
    <div className="login-card-modal">
      <div className="container">
        <div className="login-card-wrapper">
          <div className="login-card-front">
            <img
              src={closeIcon}
              alt="Fechar"
              className="close-icon"
              onClick={fecharModal}
            />

            <div className="login-left">
              <h2>Seja Bem-vindo!</h2>

              <div className="input-group">
                <label>Usuário</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    placeholder="Email / Usuário"
                    autoComplete="off"
                  />
                  <img src={user} alt="Usuário" className="icon-right" />
                </div>
              </div>

              <div className="input-group">
                <label>Senha</label>
                <div className="input-with-icon">
                  <input
                    type={mostrarSenhaLogin ? "text" : "password"}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                  />
                  <img
                    src={mostrarSenhaLogin ? show : hide}
                    alt="Alternar visibilidade da senha"
                    className="icon-right"
                    onClick={() =>
                      setMostrarSenhaLogin(!mostrarSenhaLogin)
                    }
                  />
                </div>
              </div>

              <button type="button" className="login-btn">Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
