describe('Favorite Dogs Page spec', () => {
  beforeEach(() => {
    cy.fixture('dogs').then((json) => {
      cy.intercept('GET', 'https://api.thedogapi.com/v1/breeds', json)
      cy.visit('http://localhost:3000')
      cy.get('.mood-container').contains('h2', 'The Defender').click()
      cy.get('.submit-button').click()
      cy.url().should('include', '/matches')
      cy.get('.favorite-image').first().click()
      cy.get('.links').contains('Favorites').click()
    })
  });

  it('should be able to see the App header and nav bar links', () => {
    cy.contains('.app-title', "Canine Cupid - A Wag Worthy Match")
    cy.contains('.links', 'Favorites')
    cy.contains('.links', 'Matches')
  });

  it('should be able to visit the favorites page and see a list of favorite dog cards', () => {
    cy.url().should('include', '/favorites')
    cy.get('.favorite-dogs-container').should('be.visible')
    cy.get('.featured-dog-image').should('have.attr', 'src', 'https://cdn2.thedogapi.com/images/rJIakgc4m.jpg')
    cy.get('.dog-breed').contains('American Staffordshire Terrier')
  });

  it('should be able to unfavorite a dog and remove it from the list', () => {
    cy.get('.favorite-image').first().click()
  });
});

