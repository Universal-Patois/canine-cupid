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
    cy.get(".mood-card > :nth-child(1)").contains('The Debator')
    cy.get(".mood-card > :nth-child(1)").contains('Curious and strategic thinkers with a plan for everything who cannot resist an intellectual challenge')
    // cy.get("div[class='mood-form']").click()

  })
})