Cypress.on("uncaught:exception", () => false);

beforeEach(() => {
  cy.on("window:alert", (message) => {
    Cypress.env("lastAlert", message);
  });
});
