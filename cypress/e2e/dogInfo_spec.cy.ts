describe('Dog info page', () => {
  beforeEach(() => {
    cy.fixture("dogInfo_fixture").then((json) => {
      cy.intercept("GET", "https://api.thedogapi.com/v1/breeds", json)
      cy.visit('http://localhost:3000/breeds/Affenpinscher')
    })
  })

  it('should have the App header and nav links', () => {
    cy.contains(".app-title", "Canine Cupid - A Wag Worthy Match");
    cy.contains(".links", "Favorites")
    cy.url().should("include", "/Affenpinscher");
  });
  
  it('should contain an image of the dog', () => {
    cy.get('.dog-info-image').should('have.attr', 'src', 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg')
  })
  
  it('should contain information on the dog breed', () => {
    cy.get('.dog-breed-info')
      .contains('Affenpinscher')
    cy.get('.breed-group')
      .contains('Toy')
    cy.get('.bred-for')
      .contains('Small rodent hunting, lapdog')
    cy.get('.breed-origin')
      .contains('Germany, France')
    cy.get('.life-span')
      .contains('10 - 12 years')
    cy.get('.height-imperial')
      .contains('9 - 11.5')
    cy.get('.height-metric')
      .contains('23 - 29')
    cy.get('.weight-imperial')
      .contains('6 - 13')
    cy.get('.weight-metric')
      .contains('3 - 6')
    cy.get('.temperament')
      .contains('Stubborn, Curious, Playful, Adventurous, Active, Fun-loving')
  })

  it('should be able to return to the homepage when the back button is clicked', () => {
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})