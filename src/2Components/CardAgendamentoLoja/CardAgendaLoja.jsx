import React, { useState, useRef } from "react";
import "./CardAgendaLoja.css";
import closeIcon from "../../1Assets/close.png";
import calendarIcon from "../../1Assets/calendar.png";
import clockIcon from "../../1Assets/clock.png";
import userIcon from "../../1Assets/user.png";
import phoneIcon from "../../1Assets/phone.png";
import arrowIcon from "../../1Assets/arrow.png";

export default function CardAgendamento({ onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Estados independentes para a frente
  const [dataFront, setDataFront] = useState("");
  const [horaFront, setHoraFront] = useState("");
  const [nomeFront, setNomeFront] = useState("");
  const [telefoneFront, setTelefoneFront] = useState("");
  const [barbeiroFront, setBarbeiroFront] = useState("");

  // Estados independentes para o verso
  const [dataBack, setDataBack] = useState("");
  const [horaBack, setHoraBack] = useState("");
  const [nomeBack, setNomeBack] = useState("");
  const [telefoneBack, setTelefoneBack] = useState("");
  const [barbeiroBack, setBarbeiroBack] = useState("");

  const dataRefFront = useRef(null);
  const horaRefFront = useRef(null);
  const dataRefBack = useRef(null);
  const horaRefBack = useRef(null);

  const barbeiros = ["Carlos", "João", "Marcos", "Fernando"];

  const confirmarAgendamento = (lado) => {
    const agendamento = lado === "front"
      ? { nome: nomeFront, telefone: telefoneFront, barbeiro: barbeiroFront, data: dataFront, hora: horaFront }
      : { nome: nomeBack, telefone: telefoneBack, barbeiro: barbeiroBack, data: dataBack, hora: horaBack };
    console.log(`${lado === "front" ? "Agendamento" : "Reagendamento"}:`, agendamento);
  };

  const renderForm = (lado) => {
    const isBack = lado === "back";
    const nome = isBack ? nomeBack : nomeFront;
    const setNome = isBack ? setNomeBack : setNomeFront;
    const telefone = isBack ? telefoneBack : telefoneFront;
    const setTelefone = isBack ? setTelefoneBack : setTelefoneFront;
    const barbeiro = isBack ? barbeiroBack : barbeiroFront;
    const setBarbeiro = isBack ? setBarbeiroBack : setBarbeiroFront;
    const data = isBack ? dataBack : dataFront;
    const setData = isBack ? setDataBack : setDataFront;
    const hora = isBack ? horaBack : horaFront;
    const setHora = isBack ? setHoraBack : setHoraFront;
    const dataRef = isBack ? dataRefBack : dataRefFront;
    const horaRef = isBack ? horaRefBack : horaRefFront;

    return (
      <div className="agendamento-card">
        {isBack && (
          <img
            src={arrowIcon}
            alt="Voltar"
            className="back-icon"
            onClick={() => setIsFlipped(false)}
          />
        )}
        <img
          src={closeIcon}
          alt="Fechar"
          className="close-icon"
          onClick={onClose}
        />
        <h2>{isBack ? "Reagendar" : "Agendar Horário"}</h2>

        {/* Nome */}
        <div className="input-group">
          <label>Nome</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <img src={userIcon} alt="Nome" className="icon-right" />
          </div>
        </div>

        {/* Telefone */}
        <div className="input-group">
          <label>Telefone</label>
          <div className="input-with-icon">
            <input
              type="tel"
              placeholder="(00) 0000 - 0000"
              value={telefone}
              maxLength={16}
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
            <img src={phoneIcon} alt="Telefone" className="icon-right" />
          </div>
        </div>

        {/* Barbeiro */}
        <div className="input-group">
          <label>Barbeiro</label>
          <div className="input-with-icon">
            <select
              className="select-barbeiro"
              value={barbeiro}
              onChange={(e) => setBarbeiro(e.target.value)}
            >
              <option value="">Escolha um barbeiro</option>
              {barbeiros.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data */}
        <div className="input-group">
          <label>Data</label>
          <div className="input-with-icon">
            <input
              ref={dataRef}
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <img
              src={calendarIcon}
              alt="Data"
              className="icon-right"
              onClick={() => dataRef.current?.showPicker?.()}
            />
          </div>
        </div>

        {/* Hora */}
        <div className="input-group">
          <label>Hora</label>
          <div className="input-with-icon">
            <input
              ref={horaRef}
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            <img
              src={clockIcon}
              alt="Hora"
              className="icon-right"
              onClick={() => horaRef.current?.showPicker?.()}
            />
          </div>
        </div>

        <button className="agendar-btn" onClick={() => confirmarAgendamento(lado)}>
          {isBack ? "Confirmar Reagendamento" : "Confirmar Agendamento"}
        </button>

        {!isBack && (
          <button className="reagendar-btn" onClick={() => setIsFlipped(true)}>
            Reagendar
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
          <div className="card-face front">{renderForm("front")}</div>
          <div className="card-face back">{renderForm("back")}</div>
        </div>
      </div>
    </div>
  );
}