import React, { useState } from "react";
import "./CardCadastro.css";

import user from "../../assets/user.png";
import closeIcon from "../../assets/close.png";
import hide from "../../assets/hide.png";
import show from "../../assets/show.png";
import arrow from "../../assets/arrow.png";
import google from "../../assets/google.png";
import email from "../../assets/email.png";
import phone from "../../assets/phone.png";
import padlock from "../../assets/padlock.png";

export default function LoginCard({ onClose }) {
  const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="container">
      <div className={`login-card-wrapper ${flipped ? "flipped" : ""}`}>
        {/* LOGIN */}
        <div className="login-card-front">
          <img
            src={closeIcon}
            alt="Fechar"
            className="close-icon"
            onClick={onClose}
          />

          <div className="login-left">
            <h2>Seja Bem-vindo!</h2>

            <p>
              Não tem uma conta?{" "}
              <span onClick={() => setFlipped(true)}>Cadastre-se</span>
            </p>

            <div className="input-group">
              <label>Usuário</label>

              <div className="input-with-icon">
                <input
                  type="text"
                  placeholder="Email / Usuário"
                  autoComplete="off"
                />

                <img
                  src={user}
                  alt="Usuário"
                  className="icon-right"
                />
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
                  onClick={() => setMostrarSenhaLogin(!mostrarSenhaLogin)}
                />
              </div>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Lembrar
              </label>

              <a href="#">Esqueceu a Senha?</a>
            </div>

            <button className="login-btn">Entrar</button>
          </div>
        </div>

        {/* CADASTRO */}
        <div className="login-card-back">
          <img
            src={arrow}
            alt="Voltar"
            className="back-arrow"
            onClick={() => setFlipped(false)}
          />

          <img
            src={closeIcon}
            alt="Fechar"
            className="close-icon"
            onClick={onClose}
          />

          <div className="login-left">
            <h2>Cadastre-se</h2>

            <div className="register-grid">
              {/* COLUNA ESQUERDA */}
              <div className="register-fields">
                <div className="input-group">
                  <label>Email</label>

                  <div className="input-with-icon">
                    <input
                      type="email"
                      placeholder="Digite seu email"
                    />

                    <img
                      src={email}
                      alt="Email"
                      className="icon-right"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Telefone</label>

                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="(61) 0000-0000"
                    />

                    <img
                      src={phone}
                      alt="Telefone"
                      className="icon-right"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Senha</label>

                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="••••••"
                    />

                    <img
                      src={padlock}
                      alt="Senha"
                      className="icon-right"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Confirmar Senha</label>

                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="••••••"
                    />

                    <img
                      src={padlock}
                      alt="Confirmar senha"
                      className="icon-right"
                    />
                  </div>
                </div>

                <button className="login-btn">Cadastrar</button>
              </div>

              {/* COLUNA DIREITA */}
              <div className="register-google">
                <button className="google-btn">
                  <img
                    src={google}
                    alt="Google"
                    className="google-icon"
                  />
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}