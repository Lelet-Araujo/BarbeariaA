const todayIso = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

describe("BarbeariaA", () => {
  it("abre a home, valida o modal de agendamento e confirma um agendamento", () => {
    cy.visit("/");

    cy.contains("LogoBarbearia").should("be.visible");
    cy.contains("button", "Agendar Agora").click();
    cy.contains("h2", "Agendamento").should("be.visible");

    cy.contains("button", "Confirmar Agendamento").click();
    cy.contains(".erro-texto", /Nome/).should("be.visible");
    cy.contains(".erro-texto", /Telefone/).should("be.visible");

    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get('input[placeholder="Seu nome"]').type("Cliente Teste");
    cy.get('input[placeholder="(00) 00000-0000"]').type("11999998888");
    cy.get("select").eq(0).select("Carlos");
    cy.get('input[type="date"]').type(todayIso());
    cy.get("select").eq(1).select("09:00");
    cy.contains("button", "Confirmar Agendamento").click();

    cy.get("@consoleLog").should("have.been.called");
  });

  it("abre o login pela home e navega para a agenda", () => {
    cy.visit("/");

    cy.contains("button", "Login").click();
    cy.contains("h2", "Seja Bem-vindo!").should("be.visible");
    cy.get('input[type="password"]').should("have.length", 1);
    cy.get('img[alt="Alternar visibilidade da senha"]').click();
    cy.get('input[type="text"]').should("have.length.at.least", 2);

    cy.contains("button", "Entrar").click();
    cy.location("pathname", { timeout: 2000 }).should("eq", "/agenda");
    cy.contains("h2", "Agenda").should("be.visible");
  });

  it("gerencia horários na agenda: adiciona, valida, reagenda, exclui e abre WhatsApp", () => {
    cy.visit("/agenda");

    cy.on("window:alert", (message) => {
      expect(message).to.match(/Selecione|Preencha/);
    });
    cy.on("window:confirm", () => true);

    cy.contains(".agenda-linha", "09:00").within(() => {
      cy.contains("Jo").should("be.visible");
      cy.contains("button", "Reagendar").click();
    });

    cy.contains("h3", "Reagendar").should("be.visible");
    cy.contains("button", "Confirmar").click();
    cy.get(".card-agendamento select").last().select("10:30");
    cy.contains("button", "Confirmar").click();
    cy.contains(".agenda-linha", "10:30", { timeout: 1000 }).should("contain", "Jo");

    cy.contains(".agenda-linha", "11:00").within(() => {
      cy.contains("button", "+").click();
    });

    cy.contains("h3", "Agendar").should("be.visible");
    cy.contains("button", "Adicionar").click();

    cy.get(".card-agendamento").within(() => {
      cy.get('input[type="text"]').eq(0).type("Ana Teste");
      cy.get('input[type="text"]').eq(1).type("11977776666");
      cy.get("select").select("Barba");
      cy.contains("button", "Adicionar").click();
    });

    cy.contains(".agenda-linha", "11:00", { timeout: 1000 }).should("contain", "Ana Teste");

    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.contains(".agenda-linha", "11:00").within(() => {
      cy.contains("button", "Avisar").click();
    });
    cy.get("@windowOpen").should("have.been.calledWithMatch", /^https:\/\/wa\.me\/55/);

    cy.contains(".agenda-linha", "11:00").within(() => {
      cy.contains("button", "Excluir").click();
    });
    cy.contains(".agenda-linha", "11:00").should("contain", "Livre");
  });

  it("gerencia funcionários e abre a agenda do funcionário selecionado", () => {
    cy.visit("/funcionarios");

    cy.on("window:alert", (message) => {
      expect(message).to.match(/Preencha/);
    });

    cy.contains("h2", "Funcion").should("be.visible");
    cy.contains("button", "Adicionar").click();

    cy.get('input[placeholder="Nome"]').type("Pedro Ramos");
    cy.get('input[placeholder^="Fun"]').type("Barbeiro");
    cy.get('input[placeholder="Telefone"]').type("11988887777");
    cy.get('input[placeholder="Email"]').type("pedro@teste.com");
    cy.contains("button", "Adicionar").click();

    cy.contains(".funcionario-card", "Pedro Ramos").as("pedroCard");
    cy.get("@pedroCard").should("contain", "pedro@teste.com");
    cy.contains(".funcionario-card", "Pedro Ramos").contains("button", "Inativo").click();
    cy.contains(".funcionario-card", "Pedro Ramos").should("contain", "Inativo");
    cy.contains(".funcionario-card", "Pedro Ramos").contains("button", "Editar").click();

    cy.get('input[placeholder="Nome"]').clear().type("Pedro Santos");
    cy.contains("button", "Atualizar").click();
    cy.contains(".funcionario-card", "Pedro Santos").as("pedroEditado");

    cy.get("@pedroEditado").contains("button", "Agenda").click();
    cy.location("pathname").should("eq", "/agenda");
    cy.location("search").should("contain", "funcionario=Pedro%20Santos");
    cy.contains("button", "Pedro Santos").should("be.visible");
  });

  it("filtra, edita, valida, exclui loja e abre o cadastro pelo painel administrativo", () => {
    cy.visit("/adm");

    cy.contains("h1", "Painel de Lojas").should("be.visible");
    cy.get('input[placeholder="Buscar por nome ou telefone"]').type("Elite");
    cy.get(".adm-home-card").should("have.length", 1).and("contain", "Barbearia Elite");

    cy.get("select").select("Ativa");
    cy.get(".adm-home-card").should("have.length", 1);
    cy.contains("button", "Editar").click();
    cy.contains("h3", "Editar Loja").should("be.visible");

    cy.get(".adm-home-modal input").eq(1).clear().type("11111111111111");
    cy.contains("button", "Salvar").click();
    cy.contains(".error-text", "CNPJ").should("be.visible");

    cy.get(".adm-home-modal input").eq(1).clear().type("11222333000181");
    cy.get(".adm-home-modal input").eq(2).clear().type("11999998888");
    cy.get(".adm-home-modal select").select("Inativa");
    cy.contains("button", "Salvar").click();
    cy.get(".adm-home-actions select").select("Todos");
    cy.contains(".adm-home-card", "Barbearia Elite", { timeout: 1000 }).should("contain", "Inativa");

    cy.get('input[placeholder="Buscar por nome ou telefone"]').clear();
    cy.contains(".adm-home-card", "Barbearia Elite").within(() => {
      cy.contains("button", "Excluir").click();
    });
    cy.contains("h3", "Excluir Loja").should("be.visible");
    cy.get(".adm-home-modal-confirm").contains("button", "Excluir").click();
    cy.contains(".adm-home-card", "Barbearia Elite").should("not.exist");

    cy.contains("button", "+ Nova Loja").click();
    cy.contains("h2", "Cadastre-se").should("be.visible");
    cy.get('input[placeholder="Nome da loja"]').type("Nova Barbearia");
    cy.get('input[placeholder="00.000.000/0000-00"]').type("11222333000181");
    cy.get('input[placeholder="Email da loja"]').type("loja@teste.com");
    cy.get('input[placeholder="(00) 00000-0000"]').type("11999998888");
    cy.get('input[type="password"]').should("have.length", 2);
  });
});
