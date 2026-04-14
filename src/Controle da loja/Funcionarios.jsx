// FuncionarioPage.jsx
import React, { useState } from "react";
import "./Funcionarios.css";
import NavbarSimples from "../2Components/NavBarLoja/NavbarLoja";

export default function FuncionarioPage() {
    const [funcionarios, setFuncionarios] = useState([
        { id: 1, nome: "João Silva", funcao: "Barbeiro", telefone: "1111-1111", email: "joao@email.com", ativo: true },
        { id: 2, nome: "Maria Souza", funcao: "Recepcionista", telefone: "2222-2222", email: "maria@email.com", ativo: true },
    ]);

    const [novoFuncionario, setNovoFuncionario] = useState({ nome: "", funcao: "", telefone: "", email: "", ativo: true });
    const [editId, setEditId] = useState(null);

    const [funcToDelete, setFuncToDelete] = useState(null); // Para o modal de confirmação

    const handleSalvar = () => {
        const nome = novoFuncionario.nome.trim();
        const funcao = novoFuncionario.funcao.trim();
        const email = novoFuncionario.email.trim();
        const telefone = novoFuncionario.telefone.trim();
        const telefoneLimpo = telefone.replace(/\D/g, "");
        const emailValido = /\S+@\S+\.\S+/.test(email);

        if (!nome || !funcao || !telefone || !email) {
            alert("Preencha todos os campos!");
            return;
        }

        if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
            alert("Telefone inválido!");
            return;
        }

        if (!emailValido) {
            alert("Email inválido!");
            return;
        }

        const funcionarioPayload = {
            ...novoFuncionario,
            nome,
            funcao,
            telefone,
            email
        };

        if (editId) {
            setFuncionarios(funcionarios.map(f => f.id === editId ? { ...funcionarioPayload, id: editId } : f));
        } else {
            setFuncionarios([...funcionarios, { ...funcionarioPayload, id: Date.now() }]);
        }
        setNovoFuncionario({ nome: "", funcao: "", telefone: "", email: "", ativo: true });
        setEditId(null);
    };

    const handleEditar = (func) => {
        setNovoFuncionario({ ...func });
        setEditId(func.id);
    };

    const handleExcluirConfirmado = () => {
        if (funcToDelete !== null) {
            setFuncionarios(funcionarios.filter(f => f.id !== funcToDelete));
            setFuncToDelete(null);
        }
    };

    const handleCancelarExclusao = () => {
        setFuncToDelete(null);
    };

    const handleToggleAtivo = (id) => {
        setFuncionarios(funcionarios.map(f => f.id === id ? { ...f, ativo: !f.ativo } : f));
    };

    return (
        <>
            <NavbarSimples />

            <div className="funcionario-page">
                <h2>Funcionários</h2>

                <div className="funcionario-form">
                    <input
                        type="text"
                        placeholder="Nome"
                        value={novoFuncionario.nome}
                        onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Função"
                        value={novoFuncionario.funcao}
                        onChange={(e) => setNovoFuncionario({ ...novoFuncionario, funcao: e.target.value })}
                    />
                   <input
  type="tel"
  placeholder="Telefone"
  value={novoFuncionario.telefone}
  onChange={(e) => {
    const input = e.target;
    const selectionStart = input.selectionStart;

    // Remove tudo que não é número e limita a 11 dígitos
    let digits = input.value.replace(/\D/g, "").slice(0, 11);

    // Formata telefone conforme quantidade de dígitos
    let formatted;
    if (digits.length <= 10) {
      // Telefone fixo ou celular antigo
      formatted = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    } else {
      // Celular novo com 9 dígitos
      formatted = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }

    // Atualiza estado
    setNovoFuncionario({ ...novoFuncionario, telefone: formatted });

    // Mantém cursor na posição correta
    setTimeout(() => {
      input.selectionStart = selectionStart;
      input.selectionEnd = selectionStart;
    }, 0);
  }}
/>
                    <input
                        type="email"
                        placeholder="Email"
                        value={novoFuncionario.email}
                        onChange={(e) => setNovoFuncionario({ ...novoFuncionario, email: e.target.value })}
                    />
                    <button type="button" onClick={handleSalvar}>{editId ? "Atualizar" : "Adicionar"}</button>
                </div>

                <div className="funcionario-list">
                    {funcionarios.map(func => (
                        <div key={func.id} className="funcionario-card">
                            <div className="dados-funcionario">
                                <span><strong>{func.nome}</strong></span>
                                <span>{func.funcao}</span>
                                <span>{func.telefone}</span>
                                <span>{func.email}</span>
                                <span>{func.ativo ? "Ativo" : "Inativo"}</span>
                            </div>

                            <div className="acoes-funcionario">
                                <button type="button" onClick={() => handleEditar(func)}>Editar</button>
                                <button type="button" onClick={() => setFuncToDelete(func.id)}>Excluir</button>
                                <button type="button" onClick={() => handleToggleAtivo(func.id)}>
                                    {func.ativo ? "Inativo" : "Ativo"}
                                </button>
                                <button type="button" onClick={() => alert("Abrir agenda do funcionário")}>Agenda</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal simples de confirmação */}
                {funcToDelete !== null && (
                    <div className="modal-confirm">
                        <div className="modal-content">
                            <p>Deseja realmente excluir este funcionário?</p>
                            <button type="button" onClick={handleExcluirConfirmado}>Sim</button>
                            <button type="button" onClick={handleCancelarExclusao}>Não</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
