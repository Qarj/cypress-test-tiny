// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('clearCECookies', () => {
    Cypress.Cookies.debug(true);
    let healthcheckUrl = 'https://www.stepstone.de/membersarea/health?format=html';
    cy.visit(healthcheckUrl); // MUST BE .visit do not change for .request

    logCookies();

    cy.clearCookies();

    logCookies();

    cy.wait(3000);

    logCookies();
    cy.getCookie('authHash').should('not.exist');
    cy.getCookies().should('be.empty');
});

function logCookies() {
    cy.getCookies()
    .then((cookies) => {
        cookies.forEach(element => cy.log(element.name));
  })
}

Cypress.Commands.add('carryOutLoginCE', () => {
    cy.request({
        url: `https://www.stepstone.de/public-api/v1/candidate/authentication`,
        failOnStatusCode: true,
        method: 'POST',
        body: { "email": 'cookiebug@in.fistep.com', "password": '_cypress721', "rememberMe": true, "loginSource": "Homepage_top-login" },
    }).then((response) => {
        expect(response.status).to.eq(201)
    });
})
