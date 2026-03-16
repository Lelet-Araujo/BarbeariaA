import React, { useState } from "react";
import "./Agenda.css";
import NavbarSimples from "../2Components/NavBarLoja/NavbarLoja";

export default function AgendaPage() {
  const barbeiros = ["Carlos", "João", "Marcos"];
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(barbeiros[0]);
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [cardAberto, setCardAberto] = useState(false);
  const [fechandoCard, setFechandoCard] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [modoReagendar, setModoReagendar] = useState(false);
  const [agendamentoAtual, setAgendamentoAtual] = useState(null);

  const [agendamentos, setAgendamentos] = useState([
    { barbeiro: "Carlos", hora: "09:00", nome: "João Silva", servico: "Corte", telefone: "(11)9999-1111" },
    { barbeiro: "Carlos", hora: "10:00", nome: "Marcos Pereira", servico: "Barba + Corte", telefone: "(11)9888-2222" }
  ]);

  const horarios = gerarHorarios();

  const abrirCard = (hora) => {
    const existe = agendamentos.some(
      (a) => a.barbeiro === barbeiroSelecionado && a.hora === hora
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
  };

  const abrirReagendar = (agendamento) => {
    setAgendamentoAtual(agendamento);
    setCardAberto(true);
    setFechandoCard(false);
    setModoReagendar(true);
    setTelefone(agendamento.telefone);
  };

  const fecharCard = () => {
    setFechandoCard(true);
    setTimeout(() => {
      setCardAberto(false);
      setModoReagendar(false);
      setAgendamentoAtual(null);
      setTelefone("");
      setHoraSelecionada("");
    }, 300);
  };

  const adicionarCliente = (evento) => {
    evento.preventDefault();
    const form = evento.target;
    const novoAgendamento = {
      barbeiro: barbeiroSelecionado,
      hora: horaSelecionada,
      nome: form.nome.value,
      telefone: telefone,
      servico: form.servico.value
    };
    setAgendamentos([...agendamentos, novoAgendamento]);
    fecharCard();
  };

  const confirmarReagendamento = (evento) => {
    evento.preventDefault();
    const form = evento.target;
    const novoHorario = form.hora.value;
    const agendamentosAtualizados = agendamentos.filter(a => a !== agendamentoAtual);
    agendamentosAtualizados.push({
      ...agendamentoAtual,
      hora: novoHorario
    });
    setAgendamentos(agendamentosAtualizados);
    fecharCard();
  };

  const excluirAgendamento = (agendamento) => {
    if (window.confirm("Deseja realmente excluir este agendamento?")) {
      setAgendamentos(agendamentos.filter(a => a !== agendamento));
    }
  };

  const avisarCliente = (agendamento) => {
    const telefoneNumero = agendamento.telefone.replace(/\D/g, ""); 
    const msg = encodeURIComponent("Olá, infelizmente precisaremos desmarcar seu horário. Por favor, reagende.");
    window.open(`https://wa.me/55${telefoneNumero}?text=${msg}`, "_blank");
  };

  const horariosLivres = (barbeiro) => {
    return horarios.filter(h => !agendamentos.some(a => a.barbeiro === barbeiro && a.hora === h));
  };

  return (
    <>
      <NavbarSimples />
      <div className="agenda-page">
        <h2>Agenda do Dia</h2>
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
              (a) => a.barbeiro === barbeiroSelecionado && a.hora === hora
            );
            return (
              <div className={`agenda-linha ${agendamento ? "ocupado" : ""}`} key={hora}>
                <span className="hora">{hora}</span>
                <span className="cliente">{agendamento ? agendamento.nome : "Livre"}</span>
                <span className="servico">{agendamento ? agendamento.servico : "-"}</span>
                <span className="telefone">{agendamento ? agendamento.telefone : "-"}</span>
                {!agendamento ? (
                  <button className="btn-add" onClick={() => abrirCard(hora)}>+</button>
                ) : (
                  <div className="btn-grupo">
                    <button onClick={() => abrirReagendar(agendamento)}>Reagendar</button>
                    <button onClick={() => excluirAgendamento(agendamento)}>Excluir</button>
                    <button onClick={() => avisarCliente(agendamento)}>Avisar</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {cardAberto && (
        <div className={`card-overlay ${fechandoCard ? "fechando" : ""}`}>
          <form
            className={`card-agendamento ${fechandoCard ? "fechando" : ""}`}
            onSubmit={modoReagendar ? confirmarReagendamento : adicionarCliente}
          >
            {modoReagendar ? (
              <>
                <h3>Reagendar - {agendamentoAtual?.nome}</h3>
                <label>
                  Horário:
                  <select name="hora" required defaultValue="">
                    <option value="" disabled>Selecione</option>
                    {horariosLivres(agendamentoAtual.barbeiro).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </label>
                <div className="card-buttons">
                  <button type="submit">Confirmar</button>
                  <button type="button" onClick={fecharCard}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <h3>Agendar Horário - {horaSelecionada}</h3>
                <label>
                  Nome:
                  <input type="text" name="nome" required />
                </label>
                <label>
                  Telefone:
                  <input
                    type="text"
                    name="telefone"
                    value={telefone}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length > 10) v = v.slice(0, 10);
                      if (v.length > 6) {
                        v = `(${v.slice(0,2)}) ${v.slice(2,6)} - ${v.slice(6)}`;
                      } else if (v.length > 2) {
                        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
                      } else if (v.length > 0) {
                        v = `(${v}`;
                      }
                      setTelefone(v);
                    }}
                    required
                  />
                </label>
                <label>
                  Serviço:
                  <select name="servico" required>
                    <option value="">Selecione</option>
                    <option value="Corte">Corte</option>
                    <option value="Barba">Barba</option>
                    <option value="Barba + Corte">Barba + Corte</option>
                  </select>
                </label>
                <div className="card-buttons">
                  <button type="submit">Adicionar</button>
                  <button type="button" onClick={fecharCard}>Cancelar</button>
                </div>
              </>
            )}
          </form>
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