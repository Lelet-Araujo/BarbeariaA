import React, { useState } from "react";
import "./CardCadastroLoja.css";

import user from "../../1Assets/user.png";
import closeIcon from "../../1Assets/close.png";
import hide from "../../1Assets/hide.png";
import show from "../../1Assets/show.png";
import arrow from "../../1Assets/arrow.png";
import email from "../../1Assets/email.png";
import phone from "../../1Assets/phone.png";
import padlock from "../../1Assets/padlock.png";


export default function LoginCard({ onClose }) {
  const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [mostrarSenhaCadastro, setMostrarSenhaCadastro] = useState(false);

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

        {/* CADASTRO LOJA */}
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
              {/* Coluna Esquerda */}
              <div className="register-column">
                <div className="input-group">
                  <label>Nome da Loja</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="Nome da loja" />
                    <img src={user} alt="Loja" className="icon-right" />
                  </div>
                </div>

                {/* CNPJ */}
                {/* CNPJ com máscara */}
                <div className="input-group">
                  <label>CNPJ</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="00.000.000 / 0000-00"
                      maxLength={22} // conta pontos, barra e traço
                      onInput={(e) => {
                        let x = e.target.value.replace(/\D/g, ""); // só números
                        if (x.length > 14) x = x.slice(0, 14); // limita a 14 dígitos
                        if (x.length > 12) {
                          e.target.value = `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5, 8)} / ${x.slice(8, 12)} - ${x.slice(12)}`;
                        } else if (x.length > 8) {
                          e.target.value = `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5, 8)}/${x.slice(8)}`;
                        } else if (x.length > 5) {
                          e.target.value = `${x.slice(0, 2)}.${x.slice(2, 5)}.${x.slice(5)}`;
                        } else if (x.length > 2) {
                          e.target.value = `${x.slice(0, 2)}.${x.slice(2)}`;
                        } else {
                          e.target.value = x;
                        }
                      }}
                    />
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

              {/* Coluna Direita */}

              <div className="register-column">
                <div className="input-group">
                  <label>Telefone</label>
                  <div className="input-with-icon">
                    <input
                      type="tel"
                      placeholder="(00) 0000-0000"
                      maxLength={16} // conta também parênteses e traço
                      onInput={(e) => {
                        let x = e.target.value.replace(/\D/g, "");
                        if (x.length > 11) x = x.slice(0, 11);

                        if (x.length > 10) {
                          e.target.value = `(${x.slice(0, 2)}) ${x.slice(2, 7)} - ${x.slice(7)}`;
                        } else if (x.length > 6) {
                          e.target.value = `(${x.slice(0, 2)}) ${x.slice(2, 6)} - ${x.slice(6)}`;
                        } else if (x.length > 2) {
                          e.target.value = `(${x.slice(0, 2)}) ${x.slice(2)}`;
                        } else if (x.length > 0) {
                          e.target.value = `(${x}`;
                        }

                        setTelefone(e.target.value);
                      }}
                    />
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
                      onClick={() => setMostrarSenhaCadastro(!mostrarSenhaCadastro)}
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
                      onClick={() => setMostrarSenhaCadastro(!mostrarSenhaCadastro)}
                    />
                  </div>
                </div>
              </div>

              {/* Botão centralizado */}
              <button className="login-btn register-btn">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}