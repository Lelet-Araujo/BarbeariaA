import React, { useState } from "react";
import "../CardCadastro/Cardcadastro.css";

import user from "../../1Assets/user.png";
import closeIcon from "../../1Assets/close.png";
import hide from "../../1Assets/hide.png";
import show from "../../1Assets/show.png";
import email from "../../1Assets/email.png";
import phone from "../../1Assets/phone.png";

export default function CadastroCard({ onClose }) {
  const [mostrarSenhaCadastro, setMostrarSenhaCadastro] = useState(false);

  return (
    <div className="container">
      <div className="login-card-wrapper">
        <div className="login-card-back">
          <img
            src={closeIcon}
            alt="Fechar"
            className="close-icon"
            onClick={onClose}
          />

          <div className="login-left">
            <h2>Cadastre-se</h2>

            <div className="register-grid">
              <div className="register-column">
                <div className="input-group">
                  <label>Nome da Loja</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="Nome da loja" />
                    <img src={user} alt="Loja" className="icon-right" />
                  </div>
                </div>

                <div className="input-group">
                  <label>CNPJ</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="00.000.000 / 0000-00" />
                    <img src={user} alt="CNPJ" className="icon-right" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Email da Loja</label>
                  <div className="input-with-icon">
                    <input type="email" placeholder="Email da loja" />
                    <img src={email} alt="Email" className="icon-right" />
                  </div>
                </div>
              </div>

              <div className="register-column">
                <div className="input-group">
                  <label>Telefone</label>
                  <div className="input-with-icon">
                    <input type="tel" placeholder="(00) 0000-0000" />
                    <img src={phone} alt="Telefone" className="icon-right" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Senha</label>
                  <div className="input-with-icon">
                    <input
                      type={mostrarSenhaCadastro ? "text" : "password"}
                      placeholder="••••••"
                    />
                    <img
                      src={mostrarSenhaCadastro ? show : hide}
                      alt="Alternar visibilidade da senha"
                      className="icon-right"
                      onClick={() =>
                        setMostrarSenhaCadastro(!mostrarSenhaCadastro)
                      }
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Confirmar Senha</label>
                  <div className="input-with-icon">
                    <input
                      type={mostrarSenhaCadastro ? "text" : "password"}
                      placeholder="••••••"
                    />
                    <img
                      src={mostrarSenhaCadastro ? show : hide}
                      alt="Alternar visibilidade da senha"
                      className="icon-right"
                      onClick={() =>
                        setMostrarSenhaCadastro(!mostrarSenhaCadastro)
                      }
                    />
                  </div>
                </div>
              </div>

              <button className="login-btn register-btn">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}