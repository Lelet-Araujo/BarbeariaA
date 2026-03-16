import React, { useState, useRef } from "react";
import "./CardAgendaLoja.css";
import closeIcon from "../../1Assets/close.png";
import calendarIcon from "../../1Assets/calendar.png";
import clockIcon from "../../1Assets/clock.png";
import userIcon from "../../1Assets/user.png";
import phoneIcon from "../../1Assets/phone.png";

export default function CardAgendamento({ onClose }) {

  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [barbeiro, setBarbeiro] = useState("");

  const dataRef = useRef(null);
  const horaRef = useRef(null);

  const barbeiros = [
    "Carlos",
    "João",
    "Marcos",
    "Fernando"
  ];

  const confirmarAgendamento = () => {
    const agendamento = {
      nome,
      telefone,
      barbeiro,
      data,
      hora
    };

    console.log("Agendamento:", agendamento);
  };

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
              {barbeiros.map((b, index) => (
                <option key={index} value={b}>
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
              onClick={() =>
                dataRef.current &&
                dataRef.current.showPicker &&
                dataRef.current.showPicker()
              }
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
              onClick={() =>
                horaRef.current &&
                horaRef.current.showPicker &&
                horaRef.current.showPicker()
              }
            />
          </div>
        </div>

        <button
          className="agendar-btn"
          onClick={confirmarAgendamento}
        >
          Confirmar Agendamento
        </button>

      </div>
    </div>
  );
}