import { createYield } from "typescript"

describe('dahsboard spec', () => {
  beforeEach(() => {
    cy.intercept('https://api.thedogapi.com/v1/breeds')
    .visit('http://localhost:3000').as('dogs')
  })
  it('Should render a title that links to the homepage', () => {
    cy.get('h1').contains("Canine Cupid - A Wag Worthy Match").click()
    // cy.intercept('https://api.thedogapi.com/v1/breeds')
    .url().should('include', 'http://localhost:3000')
  })
  it('Should render a favorites page that links to favorite page', () => {
    cy.contains('Favorites').click()
    // cy.intercept('https://api.thedogapi.com/v1/breeds')
    .url().should('include', 'http://localhost:3000/favorites')
  })
  it('Should render a header', () => {
    cy.get('h2').contains('Choose A Personality')
  })
  it('Should render personality cards that highlight when clicked on', () => {
    cy.get(".mood-form > :nth-child(2)").contains('The Athlete')
   
    cy.get(".mood-form > :nth-child(2)").contains('Always thinking on the move and ready for action')
  .click()
  cy.get(".mood-form > :nth-child(2)").should('have.css', 'border-color', 'rgb(255, 255, 255)')
  })
  it('Should have a find match button that takes the user to the matched page', () => {
    cy.get('button[class="submit-button"]').click() .url().should('include', 'http://localhost:3000/matches')
  })
  it('Should show fatured dogs', () => {
    cy.get('.featured-dogs-container > :nth:child(2)')
  })
})