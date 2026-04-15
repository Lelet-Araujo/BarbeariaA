import React, { useState } from "react";
import CadastroCard from "../2Components/CardCadastro/Cardcadastro";
import "./AdmHome.css";

/* Utils */
const MODAL_ANIMATION_MS = 280;
const onlyNumbers = (v) => v.replace(/\D/g, "");

const formatCNPJ = (value) => {
  const v = onlyNumbers(value).slice(0, 14);
  return v
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const formatPhone = (value) => {
  const v = onlyNumbers(value).slice(0, 11);
  return v
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

const isValidCNPJ = (cnpj) => {
  const clean = onlyNumbers(cnpj);

  if (clean.length !== 14) return false;
  if (/^(\d)\1+$/.test(clean)) return false;

  const calc = (base, factors) =>
    base.split("").reduce((sum, num, i) => sum + num * factors[i], 0);

  const base = clean.slice(0, 12);

  const d1 =
    calc(base, [5,4,3,2,9,8,7,6,5,4,3,2]) % 11 < 2
      ? 0
      : 11 - (calc(base, [5,4,3,2,9,8,7,6,5,4,3,2]) % 11);

  const d2 =
    calc(base + d1, [6,5,4,3,2,9,8,7,6,5,4,3,2]) % 11 < 2
      ? 0
      : 11 - (calc(base + d1, [6,5,4,3,2,9,8,7,6,5,4,3,2]) % 11);

  return clean === base + d1 + d2;
};

export default function AdminPanel() {
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "Barbearia Elite",
      cnpj: "12.345.678/0001-99",
      phone: "(61) 99999-9999",
      status: "Ativa",
      createdAt: "2026-03-10"
    },
    {
      id: 2,
      name: "Salão Bella Vita",
      cnpj: "98.765.432/0001-10",
      phone: "(61) 98888-7777",
      status: "Inativa",
      createdAt: "2025-11-22"
    },
    {
      id: 3,
      name: "Clínica Estética Prime",
      cnpj: "45.123.987/0001-55",
      phone: "(11) 97777-6666",
      status: "Suspensa",
      createdAt: "2026-01-05"
    },
    {
      id: 4,
      name: "Clínica Estética Prime",
      cnpj: "45.123.987/0001-55",
      phone: "(11) 97777-6666",
      status: "Suspensa",
      createdAt: "2026-01-05"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");

  const [selectedStore, setSelectedStore] = useState(null);
  const [open, setOpen] = useState(false);

  // ✅ novo estado só para cadastro
  const [openCadastro, setOpenCadastro] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [closingEdit, setClosingEdit] = useState(false);
  const [closingConfirm, setClosingConfirm] = useState(false);

  const [cnpjError, setCnpjError] = useState(false);

  const handleEdit = (store) => {
    setSelectedStore({ ...store });
    setCnpjError(false);
    setClosingEdit(false);
    setOpen(true);
  };

  const closeEditModal = () => {
    if (closingEdit) return;

    setClosingEdit(true);
    setTimeout(() => {
      setOpen(false);
      setClosingEdit(false);
    }, MODAL_ANIMATION_MS);
  };

  const closeConfirmModal = () => {
    if (closingConfirm) return;

    setClosingConfirm(true);
    setTimeout(() => {
      setConfirmOpen(false);
      setStoreToDelete(null);
      setClosingConfirm(false);
    }, MODAL_ANIMATION_MS);
  };

  const handleSave = () => {
    if (!isValidCNPJ(selectedStore.cnpj)) {
      setCnpjError(true);
      return;
    }

    setStores((prev) =>
      prev.map((s) =>
        s.id === selectedStore.id ? selectedStore : s
      )
    );
    closeEditModal();
  };

  const handleDeleteClick = (store) => {
    setStoreToDelete(store);
    setClosingConfirm(false);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!storeToDelete) return;

    setStores((prev) =>
      prev.filter((s) => s.id !== storeToDelete.id)
    );
    closeConfirmModal();
  };

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.phone.includes(search);

    const matchesFilter =
      filter === "Todos" || store.status === filter;

    return matchesSearch && matchesFilter;
  });

  // ✅ agora só abre o cadastro
  const handleNewStore = () => {
    setOpenCadastro(true);
  };

  return (
    <div className="adm-home">
      <nav className="adm-home-navbar">
        <span>Logo</span>
      </nav>

      <div className="adm-home-content">
        <h1>Painel de Lojas</h1>

        <div className="adm-home-actions">
          <input
            placeholder="Buscar por nome ou telefone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Todos</option>
            <option>Ativa</option>
            <option>Inativa</option>
            <option>Suspensa</option>
          </select>

          <button
            type="button"
            className="adm-home-btn-primary"
            onClick={handleNewStore}
          >
            + Nova Loja
          </button>
        </div>

        <div className="adm-home-store-list">
          {filteredStores.map((store) => (
            <div className="adm-home-card" key={store.id}>
              <div className="adm-home-card-left">
                <h2>{store.name}</h2>
                <p>CNPJ: {store.cnpj}</p>
                <p>Telefone: {store.phone}</p>

                <div className="adm-home-status">
                  Status: <span className={`adm-home-badge ${store.status.toLowerCase()}`}>
                    {store.status}
                  </span>
                </div>

                <p>Cadastro: {store.createdAt}</p>
              </div>

              <div className="adm-home-card-actions">
                <button
                  type="button"
                  className="adm-btn adm-btn-edit"
                  onClick={() => handleEdit(store)}
                >
                  Editar
                </button>

                <button type="button" className="adm-btn adm-btn-view">
                  Ver
                </button>

                <button
                  type="button"
                  className="adm-btn adm-btn-delete"
                  onClick={() => handleDeleteClick(store)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de edição */}
      {open && selectedStore && (
        <div className={`modal-overlay ${closingEdit ? "fechando" : ""}`}>
          <div className="adm-home-modal">
            <h3>Editar Loja</h3>

            <input
              value={selectedStore.name}
              onChange={(e) =>
                setSelectedStore({ ...selectedStore, name: e.target.value })
              }
            />

            {/* CNPJ com cursor estável e limite de 14 dígitos */}
            <input
              className={cnpjError ? "input-error" : ""}
              value={selectedStore.cnpj}
              onChange={(e) => {
                const input = e.target;
                const selectionStart = input.selectionStart;
                const formatted = formatCNPJ(input.value);

                setSelectedStore({ ...selectedStore, cnpj: formatted });
                setCnpjError(formatted.length === 18 && !isValidCNPJ(formatted));

                setTimeout(() => {
                  input.selectionStart = selectionStart;
                  input.selectionEnd = selectionStart;
                }, 0);
              }}
            />

            {cnpjError && <span className="error-text">CNPJ inválido</span>}

            {/* Telefone com cursor estável e limite de 11 dígitos */}
            <input
              value={selectedStore.phone}
              onChange={(e) => {
                const input = e.target;
                const selectionStart = input.selectionStart;
                const formatted = formatPhone(input.value);

                setSelectedStore({ ...selectedStore, phone: formatted });

                setTimeout(() => {
                  input.selectionStart = selectionStart;
                  input.selectionEnd = selectionStart;
                }, 0);
              }}
            />

            <select
              value={selectedStore.status}
              onChange={(e) =>
                setSelectedStore({
                  ...selectedStore,
                  status: e.target.value
                })
              }
            >
              <option>Ativa</option>
              <option>Inativa</option>
              <option>Suspensa</option>
            </select>

            <div className="adm-home-modal-actions">
              <button
                type="button"
                className="adm-btn adm-btn-view"
                onClick={closeEditModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="adm-btn adm-btn-edit"
                onClick={handleSave}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {confirmOpen && storeToDelete && (
        <div className={`modal-overlay ${closingConfirm ? "fechando" : ""}`}>
          <div className="adm-home-modal adm-home-modal-confirm">
            <h3>Excluir Loja</h3>
            <p>Deseja excluir "{storeToDelete.name}"?</p>

            <div className="adm-home-modal-actions">
              <button
                type="button"
                className="adm-btn adm-btn-view"
                onClick={closeConfirmModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="adm-btn adm-btn-delete"
                onClick={confirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de cadastro */}
      {openCadastro && (
        <CadastroCard onClose={() => setOpenCadastro(false)} />
      )}
    </div>
  );
}
