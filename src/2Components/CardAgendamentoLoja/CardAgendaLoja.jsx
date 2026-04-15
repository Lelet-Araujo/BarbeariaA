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
  const [erros, setErros] = useState({});
  const [fechando, setFechando] = useState(false);

  const dataRef = useRef(null);
  const telefoneRef = useRef(null);

  const barbeiros = ["Carlos", "João", "Mario"];
  const dataMinima = (() => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  })();

  const formatarTelefone = (valor) => {
    const digits = valor.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 6)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  function gerarHorarios(inicio = 7, fim = 21, intervalo = 30) {
    const horarios = [];

    for (
      let minutosTotais = inicio * 60;
      minutosTotais <= fim * 60;
      minutosTotais += intervalo
    ) {
      const hora = String(Math.floor(minutosTotais / 60)).padStart(2, "0");
      const minuto = String(minutosTotais % 60).padStart(2, "0");
      horarios.push(`${hora}:${minuto}`);
    }

    return horarios;
  }

  const limparErroCampo = (campo) => {
    setErros((estadoAtual) => {
      if (!estadoAtual[campo]) return estadoAtual;

      const novosErros = { ...estadoAtual };
      delete novosErros[campo];
      return novosErros;
    });
  };

  const validar = () => {
    const novosErros = {};
    const telefoneLimpo = telefone.replace(/\D/g, "");

    if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11)
      novosErros.telefone = "Telefone inválido";
    if (!barbeiro) novosErros.barbeiro = "Selecione um barbeiro";
    if (!data) novosErros.data = "Selecione uma data";
    if (data && data < dataMinima) novosErros.data = "Escolha uma data válida";
    if (!hora) novosErros.hora = "Selecione um horário";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const confirmar = (tipo) => {
    if (!validar()) return;

    const agendamento = {
      nome,
      telefone,
      barbeiro,
      data,
      hora,
    };

    console.log(`${tipo}:`, agendamento);
  };

  const fecharComAnimacao = () => {
    if (fechando) return;

    setFechando(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`agenda-loja-modal ${fechando ? "fechando" : ""}`}>
      <div className={`agenda-loja-card ${fechando ? "fechando" : ""}`}>
        <img
          src={closeIcon}
          alt="Fechar"
          className="close-icon"
          onClick={fecharComAnimacao}
        />

        <h2>Agendamento</h2>

        {/* Nome */}
        <div className="input-group">
          <label>Nome</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                limparErroCampo("nome");
              }}
              className={erros.nome ? "input-erro" : ""}
            />
            <img src={userIcon} alt="" className="icon-right" />
          </div>
          {erros.nome && <span className="erro-texto">{erros.nome}</span>}
        </div>

        {/* Telefone */}
        <div className="input-group">
          <label>Telefone</label>
          <div className="input-with-icon">
            <input
              ref={telefoneRef}
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => {
                const input = e.target;
                const valorOriginal = input.value;
                const posicaoCursor = input.selectionStart ?? valorOriginal.length;

                const valorFormatado = formatarTelefone(valorOriginal);
                setTelefone(valorFormatado);
                limparErroCampo("telefone");

                requestAnimationFrame(() => {
                  if (telefoneRef.current) {
                    const ajuste = valorFormatado.length - valorOriginal.length;
                    const novaPosicao = Math.max(0, posicaoCursor + ajuste);
                    telefoneRef.current.setSelectionRange(
                      novaPosicao,
                      novaPosicao
                    );
                  }
                });
              }}
              className={erros.telefone ? "input-erro" : ""}
            />
            <img src={phoneIcon} alt="" className="icon-right" />
          </div>
          {erros.telefone && (
            <span className="erro-texto">{erros.telefone}</span>
          )}
        </div>

        {/* Barbeiro */}
        <div className="input-group">
          <label>Barbeiro</label>
          <div className="input-with-icon">
            <select
              className={`select-barbeiro ${
                erros.barbeiro ? "input-erro" : ""
              }`}
              value={barbeiro}
              onChange={(e) => {
                setBarbeiro(e.target.value);
                limparErroCampo("barbeiro");
              }}
            >
              <option value="">Escolha um barbeiro</option>
              {barbeiros.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          {erros.barbeiro && (
            <span className="erro-texto">{erros.barbeiro}</span>
          )}
        </div>

        {/* Data */}
        <div className="input-group">
          <label>Data</label>
          <div className="input-with-icon">
            <input
              ref={dataRef}
              type="date"
              value={data}
              min={dataMinima}
              onChange={(e) => {
                setData(e.target.value);
                limparErroCampo("data");
              }}
              className={erros.data ? "input-erro" : ""}
            />
            <img
              src={calendarIcon}
              alt=""
              className="icon-right"
              onClick={() => dataRef.current?.showPicker?.()}
            />
          </div>
          {erros.data && (
            <span className="erro-texto">{erros.data}</span>
          )}
        </div>

        {/* Hora */}
        <div className="input-group">
          <label>Hora</label>
          <div className="input-with-icon">
            <select
              value={hora}
              onChange={(e) => {
                setHora(e.target.value);
                limparErroCampo("hora");
              }}
              className={`select-barbeiro ${
                erros.hora ? "input-erro" : ""
              }`}
            >
              <option value="">Selecione um horário</option>
              {gerarHorarios().map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <img src={clockIcon} alt="" className="icon-right" />
          </div>
          {erros.hora && (
            <span className="erro-texto">{erros.hora}</span>
          )}
        </div>

        <button
          className="agendar-btn"
          onClick={() => confirmar("Agendamento")}
        >
          Confirmar Agendamento
        </button>

        <button
          className="reagendar-btn"
          onClick={() => confirmar("Reagendamento")}
        >
          Confirmar Reagendamento
        </button>
      </div>
    </div>
  );
}
