import React, { useState, useRef } from "react";
import "./CardAgendaCL.css";
import closeIcon from "../../assetsCL/close.png";
import calendarIcon from "../../assetsCL/calendar.png";
import clockIcon from "../../assetsCL/clock.png";
import userIcon from "../../assetsCL/user.png";
import phoneIcon from "../../assetsCL/phone.png";

export default function CardAgendamento({ onClose }) {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  // refs para os inputs de data e hora
  const dataRef = useRef(null);
  const horaRef = useRef(null);

  return (
    <div className="container">
      <div className="agendamento-card">
        <img
          src={closeIcon}
          alt="Fechar"
          className="close-icon"
          onClick={onClose}
        />

        <h2>Agendar Horário</h2>

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
              placeholder="(XX) XXXX - XXXX"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              maxLength={14}
            />
            <img src={phoneIcon} alt="Telefone" className="icon-right" />
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
              onClick={() => dataRef.current && dataRef.current.showPicker && dataRef.current.showPicker()}
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
              onClick={() => horaRef.current && horaRef.current.showPicker && horaRef.current.showPicker()}
            />
          </div>
        </div>

        <button className="agendar-btn">Confirmar Agendamento</button>
      </div>
    </div>
  );
}