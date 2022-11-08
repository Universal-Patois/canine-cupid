export {};
describe("Personality Card Dashboard", () => {
  beforeEach(() => {
    cy.intercept("https://api.thedogapi.com/v1/breeds", {
      fixture: "dogData.json",
    })
      .visit("http://localhost:3000")
      .as("dogs");
  });
  it("should see a title and subheading that links to the homepage", () => {
    cy.contains("h4", "· A Wag Worthy Match ·");
    cy.get("h1")
      .contains("Canine Cupid")
      .click()
      .url()
      .should("include", "http://localhost:3000");
  });
  it("should render a favorites page link that takes user to favorite page", () => {
    cy.contains("Favorites")
      .click()
      .url()
      .should("include", "http://localhost:3000/favorites");
  });
  it("should render a personality section header", () => {
    cy.get("h2").contains("Choose Your Human Personality");
  });

  it("should render personality cards with a title and description", () => {
    cy.get(".mood-form > :nth-child(2)").contains("The Athlete");
    cy.get(".mood-form > :nth-child(2)").contains(
      "Always thinking on the move and ready for action"
    );
    cy.get(".mood-form").contains("The Debater");
    cy.get(".mood-form").contains(
      "Curious and strategic thinkers with a plan for everything who cannot resist an intellectual challenge"
    );
  });
  it("should have a find matches button that takes the user to the matched page", () => {
    cy.get('button[class="submit-button"]')
      .click()
      .url()
      .should("include", "http://localhost:3000/matches");
  });
});

describe("Featured Dogs section", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.thedogapi.com/v1/breeds", {
      body: [
        {
          weight: {
            imperial: "65 - 100",
            metric: "29 - 45",
          },
          height: {
            imperial: "23 - 25",
            metric: "58 - 64",
          },
          id: 9,
          name: "Alaskan Malamute",
          bred_for: "Hauling heavy freight, Sled pulling",
          breed_group: "Working",
          life_span: "12 - 15 years",
          temperament:
            "Friendly, Affectionate, Devoted, Loyal, Dignified, Playful",
          reference_image_id: "dW5UucTIW",
          image: {
            id: "dW5UucTIW",
            width: 1023,
            height: 769,
            url: "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg",
          },
        },
      ],
    }).as("random-featured-dog");
    cy.visit("http://localhost:3000");
  });
  it("should have a section header for Featured Dogs", () => {
    cy.contains("h2", "Featured Dogs");
  });

  it("should show random featured dogs", () => {
    cy.get(".featured-dogs-container > :nth-child(1)");
    cy.wait("@random-featured-dog").get("h3").contains("Alaskan Malamute");
  });
  it("should have a favorite button on the featured dog that adds the dog to favorites", () => {
    cy.get(".featured-dogs-container > :nth-child(1)");
    cy.wait("@random-featured-dog")
      .get('img[class="favorite-image"]')
      .should("be.visible");
  });
  it("should have a info button on the dog card that once clicked takes user to dog info page", () => {
    cy.get(".featured-dogs-container > :nth-child(1)");
    cy.wait("@random-featured-dog")
      .get('img[class="info-icon"]')
      .click()
      .url()
      .should("include", "http://localhost:3000/breeds/Alaskan%20Malamute");
  });
});
