import React, { useState } from "react";
import "./Agenda.css";
import NavbarSimples from "../2Components/NavBarLoja/NavbarLoja";

const getDataLocalISO = (date = new Date()) => {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};

export default function AgendaPage() {
  const barbeiros = ["Carlos", "João", "Artur"];

  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(barbeiros[0]);
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [cardAberto, setCardAberto] = useState(false);
  const [fechandoCard, setFechandoCard] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [modoReagendar, setModoReagendar] = useState(false);
  const [agendamentoAtual, setAgendamentoAtual] = useState(null);
  const [novoBarbeiro, setNovoBarbeiro] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novoHorario, setNovoHorario] = useState("");
  const [nomeForm, setNomeForm] = useState("");
  const [servicoForm, setServicoForm] = useState("");

  const [dataSelecionada, setDataSelecionada] = useState(getDataLocalISO());

  const [agendamentos, setAgendamentos] = useState([
    {
      barbeiro: "Carlos",
      data: getDataLocalISO(),
      hora: "09:00",
      nome: "João Silva",
      servico: "Corte",
      telefone: "(11) 9999-1111",
    },
    {
      barbeiro: "Carlos",
      data: getDataLocalISO(),
      hora: "10:00",
      nome: "Marcos Pereira",
      servico: "Barba + Corte",
      telefone: "(11) 9888-2222",
    },
  ]);

  const horarios = gerarHorarios();

  const horariosLivres = (barbeiro, data, ignorarAgendamento = null) => {
    return horarios.filter(
      (h) =>
        !agendamentos.some(
          (a) =>
            a.barbeiro === barbeiro &&
            a.hora === h &&
            a.data === data &&
            a !== ignorarAgendamento
        )
    );
  };

  const abrirCard = (hora) => {
    const existe = agendamentos.some(
      (a) =>
        a.barbeiro === barbeiroSelecionado &&
        a.hora === hora &&
        a.data === dataSelecionada
    );
    if (existe) {
      alert("Este horário já está ocupado!");
      return;
    }
    setHoraSelecionada(hora);
    setCardAberto(true);
    setFechandoCard(false);
    setModoReagendar(false);
    setTelefone("");
    setNomeForm("");
    setServicoForm("");
  };

  const abrirReagendar = (agendamento) => {
    setAgendamentoAtual(agendamento);
    setCardAberto(true);
    setFechandoCard(false);
    setModoReagendar(true);
    setTelefone(agendamento.telefone);
    setNovoBarbeiro(agendamento.barbeiro);
    setNovaData(agendamento.data);
    setNovoHorario("");
  };

  const fecharCard = () => {
    setFechandoCard(true);
    setTimeout(() => {
      setCardAberto(false);
      setModoReagendar(false);
      setAgendamentoAtual(null);
      setTelefone("");
      setHoraSelecionada("");
      setNomeForm("");
      setServicoForm("");
      setNovoHorario("");
    }, 300);
  };

  const adicionarCliente = () => {
    if (!nomeForm.trim() || !telefone.trim() || !servicoForm) {
      alert("Preencha todos os campos!");
      return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      alert("Telefone inválido!");
      return;
    }

    const conflito = agendamentos.some(
      (a) =>
        a.barbeiro === barbeiroSelecionado &&
        a.hora === horaSelecionada &&
        a.data === dataSelecionada
    );
    if (conflito) {
      alert("Este horário já está ocupado!");
      return;
    }
    setAgendamentos([
      ...agendamentos,
      {
        barbeiro: barbeiroSelecionado,
        hora: horaSelecionada,
        nome: nomeForm,
        telefone,
        servico: servicoForm,
        data: dataSelecionada,
      },
    ]);
    fecharCard();
  };

  const confirmarReagendamento = () => {
    if (!novoHorario) {
      alert("Selecione um horário!");
      return;
    }
    const conflito = agendamentos.some(
      (a) =>
        a.barbeiro === novoBarbeiro &&
        a.hora === novoHorario &&
        a.data === novaData &&
        a !== agendamentoAtual
    );
    if (conflito) {
      alert("Este horário já está ocupado!");
      return;
    }
    const atualizados = agendamentos.filter((a) => a !== agendamentoAtual);
    atualizados.push({
      ...agendamentoAtual,
      hora: novoHorario,
      data: novaData,
      barbeiro: novoBarbeiro,
    });
    setAgendamentos(atualizados);
    fecharCard();
  };

  const excluirAgendamento = (agendamento) => {
    if (window.confirm("Deseja realmente excluir este agendamento?")) {
      setAgendamentos(agendamentos.filter((a) => a !== agendamento));
    }
  };

  const avisarCliente = (agendamento) => {
    const telefoneNumero = agendamento.telefone.replace(/\D/g, "");
    const msg = encodeURIComponent(
      "Olá, infelizmente precisaremos desmarcar seu horário. Por favor, reagende."
    );
    window.open(`https://wa.me/55${telefoneNumero}?text=${msg}`, "_blank");
  };

  const formatarTelefone = (valor) => {
    const v = valor.replace(/\D/g, "").slice(0, 11);

    if (v.length <= 2) return v.length ? `(${v}` : "";
    if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;

    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  };

  return (
    <>
      <NavbarSimples />

      <div className="agenda-page">
        <h2>
          Agenda -{" "}
          {new Date(dataSelecionada + "T00:00:00").toLocaleDateString("pt-BR")}
        </h2>

        <div className="data-select">
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
          <button
            onClick={() =>
              setDataSelecionada(getDataLocalISO())
            }
          >
            Hoje
          </button>
        </div>

        <div className="barbeiro-select">
          {barbeiros.map((b) => (
            <button
              key={b}
              className={b === barbeiroSelecionado ? "ativo" : ""}
              onClick={() => setBarbeiroSelecionado(b)}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="agenda-list">
          {horarios.map((hora) => {
            const agendamento = agendamentos.find(
              (a) =>
                a.barbeiro === barbeiroSelecionado &&
                a.hora === hora &&
                a.data === dataSelecionada
            );

            return (
              <div
                className={`agenda-linha ${agendamento ? "ocupado" : ""}`}
                key={hora}
              >
                <span className="hora">{hora}</span>
                <span className="cliente">
                  {agendamento ? agendamento.nome : "Livre"}
                </span>
                <span className="servico">
                  {agendamento ? agendamento.servico : "-"}
                </span>
                <span className="telefone">
                  {agendamento ? agendamento.telefone : "-"}
                </span>

                {!agendamento ? (
                  <button className="btn-add" onClick={() => abrirCard(hora)}>
                    +
                  </button>
                ) : (
                  <div className="btn-grupo">
                    <button onClick={() => abrirReagendar(agendamento)}>
                      Reagendar
                    </button>
                    <button onClick={() => excluirAgendamento(agendamento)}>
                      Excluir
                    </button>
                    <button onClick={() => avisarCliente(agendamento)}>
                      Avisar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {cardAberto && (
        <div className={`card-overlay ${fechandoCard ? "fechando" : ""}`}>
          <div className={`card-agendamento ${fechandoCard ? "fechando" : ""}`}>
            {modoReagendar ? (
              <>
                <h3>Reagendar - {agendamentoAtual?.nome}</h3>

                <label>
                  Data:
                  <input
                    type="date"
                    value={novaData}
                    onChange={(e) => setNovaData(e.target.value)}
                  />
                </label>

                <label>
                  Barbeiro:
                  <select
                    value={novoBarbeiro}
                    onChange={(e) => setNovoBarbeiro(e.target.value)}
                  >
                    {barbeiros.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Horário:
                  <select
                    value={novoHorario}
                    onChange={(e) => setNovoHorario(e.target.value)}
                  >
                    <option value="" disabled>Selecione</option>
                    {horariosLivres(novoBarbeiro, novaData, agendamentoAtual).map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </label>

                <div className="card-buttons">
                  <button type="button" onClick={confirmarReagendamento}>Confirmar</button>
                  <button type="button" onClick={fecharCard}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <h3>Agendar Horário - {horaSelecionada}</h3>

                <label>
                  Nome:
                  <input
                    type="text"
                    value={nomeForm}
                    onChange={(e) => setNomeForm(e.target.value)}
                  />
                </label>

                <label>
                  Telefone:
                  <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                  />
                </label>

                <label>
                  Serviço:
                  <select
                    value={servicoForm}
                    onChange={(e) => setServicoForm(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Corte">Corte</option>
                    <option value="Barba">Barba</option>
                    <option value="Barba + Corte">Barba + Corte</option>
                  </select>
                </label>

                <div className="card-buttons">
                  <button type="button" onClick={adicionarCliente}>Adicionar</button>
                  <button type="button" onClick={fecharCard}>Cancelar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function gerarHorarios() {
  const horarios = [];
  let hora = 9;
  let minuto = 0;
  while (hora < 18) {
    const h = String(hora).padStart(2, "0");
    const m = String(minuto).padStart(2, "0");
    horarios.push(`${h}:${m}`);
    minuto += 30;
    if (minuto === 60) {
      minuto = 0;
      hora++;
    }
  }
  return horarios;
}
