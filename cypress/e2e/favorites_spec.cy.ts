describe("Favorite Dogs Page spec", () => {
  beforeEach(() => {
    cy.fixture("dogData").then((json) => {
      cy.intercept("GET", "https://api.thedogapi.com/v1/breeds", json);
      cy.visit("http://localhost:3000");
      cy.get(".mood-container").contains("h2", "The Defender").click();
      cy.get(".submit-button").click();
      cy.url().should("include", "/matches");
      cy.get(".favorite-image").first().click();
      cy.get(".favorite-image").eq(1).click();
      cy.get(".links").contains("Favorites").click();
    });
  });

  it("should be able to visit the Favorites page and see the App header, section header, and nav bar links", () => {
    cy.contains(".app-title", "Canine Cupid");
    cy.contains("h4", "· A Wag Worthy Match ·");
    cy.contains(".favorites-header", "Favorite Dogs");
    cy.contains(".links", "Matches")
    cy.url().should("include", "/favorites");
  });

  it("should see a list of favorite dogs with image, breed name, favorite, and info icons", () => {
    cy.get(".favorite-dogs-container").should("be.visible");
    cy.get(".featured-dog-image").should(
      "have.attr",
      "src",
      "https://cdn2.thedogapi.com/images/rkiByec47.jpg"
    );
    cy.get(".dog-breed").contains("African Hunting Dog");
    cy.get(".featured-dog-image")
      .eq(1)
      .should(
        "have.attr",
        "src",
        "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg"
      );
    cy.get(".dog-breed").eq(1).contains("Akbash Dog");
  });

  it("should be able to unfavorite a dog by clicking the heart icon and remove it from the list", () => {
    cy.get(".favorite-image").first().click();
    cy.get(".featured-dog-image").should(
      "have.attr",
      "src",
      "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg"
    );
    cy.get(".dog-breed").contains("Akbash Dog");
    cy.get(".favorite-dogs-container").should("have.length", 1);
  });

  it("should be able to visit the dog info page when info icon is clicked on dog card", () => {
    cy.get(".info-icon").first().click();
    cy.url().should("include", "/African%20Hunting%20Dog");
  });

  it("should display a message to user if there are no favorites in the list", () => {
    cy.get(".favorite-image").first().click();
    cy.get(".favorite-image").click();
    cy.contains(
      "h2",
      "You have no favorite dogs at this time, go find a new match!"
    );
  });
});
