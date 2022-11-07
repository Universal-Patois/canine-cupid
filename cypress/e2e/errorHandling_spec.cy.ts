describe("Error handling", () => {
  it("should show an error image when there is a 500 error", () => {
    cy.intercept(
      { url: "https://api.thedogapi.com/v1/breeds" },
      { statusCode: 500 }
    );
    cy.visit("http://localhost:3000/");
    cy.get(".error-message").contains("500:function text() { [native code] }");
    cy.get(".error-image").should("be.visible");
  });

  it("should show an image if there is a 404 error", () => {
    cy.intercept(
      { url: "https://api.thedogapi.com/v1/breeds" },
      { statusCode: 404 }
    );
    cy.visit("http://localhost:3000/");
    cy.get(".error-message").contains("404:function text() { [native code] }");
    cy.get(".error-image").should("be.visible");
  });

  it("should show an image for any error", () => {
    cy.intercept(
      { url: "https://api.thedogapi.com/v1/breeds" },
      { statusCode: 400 }
    );
    cy.visit("http://localhost:3000/");
    cy.get(".error-image").should("be.visible");
    cy.get(".error-message").contains("400:function text() { [native code] }");
  });

  it("should redirect the user to the homepage if a bad URL is typed", () => {
    cy.intercept("http://localhost:3000/");
    cy.visit("http://localhost:3000/garbage");
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should display a message to the user if they enter a bad url to a breed that doesnt exist", () => {
    cy.intercept("http://localhost:3000/");
    cy.visit("http://localhost:3000/breeds/garbage");
    cy.contains("h2", "No dog info available!");
  });
});
