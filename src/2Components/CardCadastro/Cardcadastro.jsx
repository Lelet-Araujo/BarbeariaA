import React, { useState, useRef } from "react";
import "../CardCadastro/Cardcadastro.css";

import user from "../../1Assets/user.png";
import closeIcon from "../../1Assets/close.png";
import hide from "../../1Assets/hide.png";
import show from "../../1Assets/show.png";
import email from "../../1Assets/email.png";
import phoneIcon from "../../1Assets/phone.png";

export default function CadastroCard({ onClose }) {
  const ANIMATION_MS = 280;
  const [mostrarSenhaCadastro, setMostrarSenhaCadastro] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [fechando, setFechando] = useState(false);
  const phoneRef = useRef(null);
  const cnpjRef = useRef(null);

  // Formata telefone mantendo cursor e limita a 11 dígitos
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11); // limite de 11
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    } else {
      return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target;
    const selectionStart = input.selectionStart;
    const formatted = formatPhone(input.value);
    setTelefone(formatted);

    setTimeout(() => {
      if (phoneRef.current) {
        phoneRef.current.selectionStart = selectionStart;
        phoneRef.current.selectionEnd = selectionStart;
      }
    }, 0);
  };

  // Formata CNPJ mantendo cursor e limita a 14 dígitos
  const formatCNPJ = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .trim();
  };

  const handleCnpjChange = (e) => {
    const input = e.target;
    const selectionStart = input.selectionStart;
    const formatted = formatCNPJ(input.value);
    setCnpj(formatted);

    setTimeout(() => {
      if (cnpjRef.current) {
        cnpjRef.current.selectionStart = selectionStart;
        cnpjRef.current.selectionEnd = selectionStart;
      }
    }, 0);
  };

  const fecharModal = () => {
    if (fechando) return;

    setFechando(true);
    setTimeout(() => {
      onClose?.();
    }, ANIMATION_MS);
  };

  return (
    <div className={`cadastro-container ${fechando ? "fechando" : ""}`}>
      <div className="cadastro-card-wrapper">
        <div className={`cadastro-card-back ${fechando ? "fechando" : ""}`}>
          <img
            src={closeIcon}
            alt="Fechar"
            className="close-icon"
            onClick={fecharModal}
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
                    <input
                      ref={cnpjRef}
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={handleCnpjChange}
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

              <div className="register-column">
                <div className="input-group">
                  <label>Telefone</label>
                  <div className="input-with-icon">
                    <input
                      ref={phoneRef}
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={telefone}
                      onChange={handlePhoneChange}
                    />
                    <img src={phoneIcon} alt="Telefone" className="icon-right" />
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

              <button type="button" className="login-btn register-btn">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
