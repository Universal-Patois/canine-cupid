import cypress from "cypress";

describe('Matched Dog Page spec', () => {
  beforeEach(() => {
    cy.fixture('dogs').then((json) => {
      cy.intercept('GET', 'https://api.thedogapi.com/v1/breeds', json)
      cy.visit('http://localhost:3000')
      cy.get('.mood-container').contains('h2', 'The Defender').click()
      cy.get('.submit-button').click()
      cy.url().should('include', '/matches')
    })
  });

  it('should be able to see the App header and nav bar links', () => {
    cy.contains('.app-title', "Canine Cupid - A Wag Worthy Match")
    cy.contains('.links', 'Favorites')
  });

  it('should see a section header and swiper carousel of dog card matches with the dogs picture, breed name, info icon, and favorite icon', () => {
    cy.contains('.matches-header', 'Your Matches:')
    cy.get('.matches-swiper').should('be.visible')
    cy.get('.featured-dog-image').should('have.attr', 'src', 'https://cdn2.thedogapi.com/images/rJIakgc4m.jpg')
    cy.get('.dog-breed').contains('American Staffordshire Terrier')
    cy.get('.info-icon').should('be.visible')
    cy.get('.favorite-image').should('be.visible')
  });

  it("should be able to click through the swiper buttons to go through matched dog cards", () => {
    cy.get(".swiper-button-next").click();
    cy.get('.featured-dog-image').eq(1).should('have.attr', 'src', 'https://cdn2.thedogapi.com/images/SkmRJl9VQ.jpg') 
    cy.get('.dog-breed').contains('American Water Spaniel')
  });

  it("should be able to visit the dog info page when info icon is clicked on a dog card", () => {
    cy.get('.info-icon').first().click()
    cy.url().should('include', '/American%20Staffordshire%20Terrier')
  });

  it("should be able to favorite and unfavorite dog cards when heart icon is clicked", () => {
    cy.get('.favorite-image').first().click()
    cy.get('.favorite-image').first().click()
  });

})