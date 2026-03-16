// FuncionarioPage.jsx
import React, { useState } from "react";
import "./Funcionarios.css";
import NavbarSimples from "../2Components/NavBarLoja/NavbarLoja"; // import da navbar

export default function FuncionarioPage() {
    const [funcionarios, setFuncionarios] = useState([
        { id: 1, nome: "João Silva", funcao: "Barbeiro", telefone: "1111-1111", email: "joao@email.com", ativo: true },
        { id: 2, nome: "Maria Souza", funcao: "Recepcionista", telefone: "2222-2222", email: "maria@email.com", ativo: true },
    ]);

    const [novoFuncionario, setNovoFuncionario] = useState({ nome: "", funcao: "", telefone: "", email: "", ativo: true });
    const [editId, setEditId] = useState(null);

    const handleSalvar = () => {
        if (editId) {
            setFuncionarios(funcionarios.map(f => f.id === editId ? { ...novoFuncionario, id: editId } : f));
        } else {
            setFuncionarios([...funcionarios, { ...novoFuncionario, id: Date.now() }]);
        }
        setNovoFuncionario({ nome: "", funcao: "", telefone: "", email: "", ativo: true });
        setEditId(null);
    };

    const handleEditar = (func) => {
        setNovoFuncionario(func);
        setEditId(func.id);
    };

    const handleExcluir = (id) => {
        if (window.confirm("Deseja realmente excluir este funcionário?")) {
            setFuncionarios(funcionarios.filter(f => f.id !== id));
        }
    };

    const handleToggleAtivo = (id) => {
        setFuncionarios(funcionarios.map(f => f.id === id ? { ...f, ativo: !f.ativo } : f));
    };

    return (
        <>
            {/* Navbar adicionada */}
            <NavbarSimples />

            <div className="funcionario-page" style={{ paddingTop: "80px" }}>
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
                            let x = e.target.value.replace(/\D/g, "");
                            if (x.length > 10) x = x.slice(0, 10);
                            if (x.length > 6) {
                                x = `(${x.slice(0, 2)}) ${x.slice(2, 6)} - ${x.slice(6)}`;
                            } else if (x.length > 2) {
                                x = `(${x.slice(0, 2)}) ${x.slice(2)}`;
                            } else if (x.length > 0) {
                                x = `(${x}`;
                            }
                            setNovoFuncionario({ ...novoFuncionario, telefone: x });
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={novoFuncionario.email}
                        onChange={(e) => setNovoFuncionario({ ...novoFuncionario, email: e.target.value })}
                    />
                    <button onClick={handleSalvar}>{editId ? "Atualizar" : "Adicionar"}</button>
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
                                <button onClick={() => handleEditar(func)}>Editar</button>
                                <button onClick={() => handleExcluir(func.id)}>Excluir</button>
                                <button onClick={() => handleToggleAtivo(func.id)}>
                                    {func.ativo ? "Inativo" : "Ativo"}
                                </button>
                                <button onClick={() => alert("Abrir agenda do funcionário")}>Agenda</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}