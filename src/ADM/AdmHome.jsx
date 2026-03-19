import React, { useState } from "react";
import CadastroCard from "../2Components/CardCadastro/Cardcadastro";
import "./AdmHome.css";

/* NAVBAR */
function NavbarSimples() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Admin</div>
      <div className="navbar-right"></div>
    </nav>
  );
}

export default function AdminLojas() {
  const [lojas, setLojas] = useState([
    {
      id: 1,
      nome: "Barbearia Elite",
      cnpj: "00.000.000/0001-00",
      telefone: "(61) 99999-9999",
      status: "Ativa",
      dataCadastro: "2026-03-10",
    },
  ]);

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [lojaSelecionada, setLojaSelecionada] = useState(null);
  const [modalCadastroOpen, setModalCadastroOpen] = useState(false);

  const abrirModal = (loja) => {
    setLojaSelecionada(loja);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setLojaSelecionada(null);
  };

  const salvarLoja = () => {
    setLojas((prev) =>
      prev.map((l) =>
        l.id === lojaSelecionada.id ? lojaSelecionada : l
      )
    );
    fecharModal();
  };

  const lojasFiltradas = lojas.filter((loja) => {
    return (
      (loja.nome.toLowerCase().includes(busca.toLowerCase()) ||
        loja.telefone.includes(busca)) &&
      (statusFiltro === "" || loja.status === statusFiltro)
    );
  });

  return (
    <>
      <NavbarSimples />

      <div className="admin-container">
        <h1>Painel de Lojas</h1>

        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Ativa">Ativa</option>
            <option value="Inativa">Inativa</option>
            <option value="Suspensa">Suspensa</option>
          </select>

          <button
            className="btn-nova"
            onClick={() => setModalCadastroOpen(true)}
          >
            + Nova Loja
          </button>
        </div>

        {/* MODAL CADASTRO */}
        {modalCadastroOpen && (
          <div className="cadastro-overlay">
            <CadastroCard onClose={() => setModalCadastroOpen(false)} />
          </div>
        )}

        {/* LISTA */}
        <div className="loja-list">
          {lojasFiltradas.map((loja) => (
            <div key={loja.id} className="loja-card">
              <div className="dados-loja">
                <span className="nome-loja">{loja.nome}</span>
                <span>CNPJ: {loja.cnpj}</span>
                <span>Telefone: {loja.telefone}</span>

                <span>
                  Status:
                  <span className={`badge ${loja.status.toLowerCase()}`}>
                    {loja.status}
                  </span>
                </span>

                <span>Cadastro: {loja.dataCadastro}</span>
              </div>

              <div className="acoes-loja">
                <button
                  className="btn-editar"
                  onClick={() => abrirModal(loja)}
                >
                  Editar
                </button>
                <button className="btn-ver">Ver</button>
                <button className="danger">Excluir</button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL EDIÇÃO */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Editar Loja</h2>

              <input
                value={lojaSelecionada.nome}
                onChange={(e) =>
                  setLojaSelecionada({
                    ...lojaSelecionada,
                    nome: e.target.value,
                  })
                }
              />

              <input
                value={lojaSelecionada.cnpj}
                onChange={(e) =>
                  setLojaSelecionada({
                    ...lojaSelecionada,
                    cnpj: e.target.value,
                  })
                }
              />

              <input
                value={lojaSelecionada.telefone}
                onChange={(e) =>
                  setLojaSelecionada({
                    ...lojaSelecionada,
                    telefone: e.target.value,
                  })
                }
              />

              <select
                value={lojaSelecionada.status}
                onChange={(e) =>
                  setLojaSelecionada({
                    ...lojaSelecionada,
                    status: e.target.value,
                  })
                }
              >
                <option>Ativa</option>
                <option>Inativa</option>
                <option>Suspensa</option>
              </select>

              <div className="modal-actions">
                <button onClick={fecharModal}>Cancelar</button>
                <button onClick={salvarLoja}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}