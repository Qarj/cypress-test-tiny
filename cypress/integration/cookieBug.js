/// <reference types="Cypress" />
context('Applications Cards CE', (done) => {
  beforeEach(() => {
    cy.clearCECookies();
    cy.carryOutLoginCE('');
  });

  it('Should have have 4 cards and redirect properly', () => {
    cy.visit('https://www.stepstone.de/membersarea/de?jh=0&rj=0');

    // check that there are four cards and not 5
    cy.get('[data-testid=applicationEl0]').should('exist');
    cy.get('[data-testid=applicationEl4]').should('not.exist');

    causeBug();

  });
  
function causeBug () {
    // Set up a spy to prove that the clicks redirect to the corret places
    cy
      .window().then((win) => {
        cy.spy(win, 'open').as('redirect');
      });

    // Click on an application card
    cy
      .get('[data-testid=applicationEl0]').invoke('attr', 'data-application-id').then(applicationId => {
        cy.log(`applicationId is ${applicationId}`);
        cy
          .get('[data-testid=applicationEl0]')
          .click();
        cy
          .get('@redirect')
          .should('be.calledWith', `/candidate/applications#/dashboard/applications/${applicationId}`, "_blank", "noopener,noreferrer");
      })

    // Click on the header
    cy
      .get('[data-header=headerMyApplications]')
      .click();
    cy
      .get('@redirect')
      .should('be.calledWith', "/candidate/applications#/dashboard/applications", "_blank", "noopener,noreferrer");
}

  it('should check that the status of the applications is correct in german', () => {
    // test irrelvant, error occurs in the beforeEach
  });

  it('should check that the status of the applications is correct in english', () => {
    // test irrelvant, error occurs in the beforeEach
  });

  it('should display CTAs in english', () => {
    // test irrelvant, error occurs in the beforeEach
  });

  it('should display CTAs in german', () => {
    // test irrelvant, error occurs in the beforeEach
  });
});
