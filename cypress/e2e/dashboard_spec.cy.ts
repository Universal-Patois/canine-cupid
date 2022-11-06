import { createYield } from "typescript"
import { fetchDogData } from "../../src/utilities/apiCalls"

describe('dahsboard spec', () => {
  beforeEach(() => {
    cy.intercept('https://api.thedogapi.com/v1/breeds', {fixture: 'dogData.json'})
    .visit('http://localhost:3000').as('dogs')
  })
  it('Should render a title that links to the homepage', () => {
    cy.get('h1').contains("Canine Cupid - A Wag Worthy Match").click()
    // cy.intercept('https://api.thedogapi.com/v1/breeds')
    .url().should('include', 'http://localhost:3000')
  })
  it('Should render a favorites page that links to favorite page', () => {
    cy.contains('Favorites').click()
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
    cy.get('button[class="submit-button"]').click().url().should('include', 'http://localhost:3000/matches')
  })
  it('Should show featured dogs', () => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/breeds', { body: [{
          weight: {
          imperial: "65 - 100",
          metric: "29 - 45"
          },
          height: {
          imperial: "23 - 25",
          metric: "58 - 64"
          },
          id: 9,
          name: "Alaskan Malamute",
          bred_for: "Hauling heavy freight, Sled pulling",
          breed_group: "Working",
          life_span: "12 - 15 years",
          temperament: "Friendly, Affectionate, Devoted, Loyal, Dignified, Playful",
          reference_image_id: "dW5UucTIW",
          image: {
          id: "dW5UucTIW",
          width: 1023,
          height: 769,
          url: "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg"
          },
      }]
    }).as('random-featured-dog')
    cy.visit('http://localhost:3000')
    cy.get('.featured-dogs-container > :nth-child(1)')
    cy.wait('@random-featured-dog').get('h3').contains('Alaskan Malamute')
  })
  it('Should have a fovrite button on the featured dog', () => {
    cy.intercept('GET', 'https://api.thedogapi.com/v1/breeds', { body: [{
          weight: {
          imperial: "65 - 100",
          metric: "29 - 45"
          },
          height: {
          imperial: "23 - 25",
          metric: "58 - 64"
          },
          id: 9,
          name: "Alaskan Malamute",
          bred_for: "Hauling heavy freight, Sled pulling",
          breed_group: "Working",
          life_span: "12 - 15 years",
          temperament: "Friendly, Affectionate, Devoted, Loyal, Dignified, Playful",
          reference_image_id: "dW5UucTIW",
          image: {
          id: "dW5UucTIW",
          width: 1023,
          height: 769,
          url: "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg"
          },
      }]
    }).as('random-featured-dog')
    cy.visit('http://localhost:3000')
    cy.get('.featured-dogs-container > :nth-child(1)')
    cy.wait('@random-featured-dog').get('img[class="favorite-image"]')
    .click().should('have.attr', 'src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAzgSURBVHic7Z15kBxVHcc/O7uErCSbi0ROW2EBBfQPoKSgLMu2ChAFhYody8IDtSARSEoUBETzB2AJpQaQABJBQAhGutACREWRBhQ1yCXKkaST7G6y9+zsbs/uzM7Z/vEyyewwR89MHzOz71M1tZnp1+/9Kr9v/97R72izbRvJ3CUUtAGSYJECmONIAcxxOoI2AABNbQOWA0ciRNmHbowGa5RLaGr7VDh8cqR/T4edzc4HYkA/MKqYVuANsDZfG4GaeiRwPnAiwtlH7Pt7GHBQQeoZYC/QB+zZ9+kD3kA3tvplclVo6hHAhws+HwLm29ksyViMZDxGQvxNp2ZmBrHtfmAAIYq3gCcV0+r3y2TvBaCpJwOf2/c5DWhzIdddwGZgM7qxzYX8akdTPwZcAnwGWFbNrZlUkujoKNFwmGwmnfvZBl4GHgceV0zrf26aW4g3AtDUY4HLEE4/1v0CZvEyQgxb0I0hj8sSaOpS4CvApYgnvC7sbJapyBjR0RFSMzOFl3cixHCXYlo76y2rEHcFoKmHAuuBNbw7pHtNBngGuBbdeN2TEjT148BqYCVwsBdFxCYniOzpI5NKFV5KAXcDNyqmFXarPHcEoKmdwJXANUBX/RnWRQa4HViPbky7kqOmLgfuBDRX8qtAJp1mrK+H+ORkscsWcAtwq2Ja8XrLqk8AmhoCLgZuQDTmGok+4Ap048m6ctHUVQjnH+qGUdUQHR1hfKAfO5stdrkfEW0fUEyraAIn1C4ATV0M/Br4VK2F+8RvgXXoRnUta01dAdyFCPeBkYrHGe3ZVaxtkONPwBcV05qoJf/aBKCpJwBPAMfXUmgARBEieMBRak39ArCRAJ76YmTSKYa2byOdSJRKsh34rGJaVfeIqh8J1NRPAVtpHucDLATuR1Mvr5hSU68FttAgzgdo7ziI93YfT8e8eaWSHA9s7e3uqjoaVycATb0KeApYVG1BDcJGNHVdyavC+T/yzxzndMybx4ru42jvKDl4uwh4qre766pq8nVeBWjqz4C11WTewHwb3bh11i8N7Px8kvE4wzu2kc1kyiW7QzGt0kLPw1kE0NTLaB3nA2xAU7+z/1uTOB9gXmcnh77/mErJ1vZ2d13mJL/KEUBTPwk8TaO8OHKXaxAPQVM4P5+xvl6mxsqOB6WBcxTTerZcovICEEO6LwFLa7BR4iHZTIaBt98sNmKYTwT4aLkh5NJVgKZ2Ibp60vkNSKi9nWVHK5WSLQWe6O3uKjk6W64N8DDita2kQelctIhDllZ8Pk9E+LIoxQWgqech3ttLGpylRx5NW6hiW/783u6u84pdePedYnz/5vpNk/hBqKODBcscjVnd3Nvd9S5/F5POV4GT6jVM4h8Lly93kuwkhG9nMbsXoKnzgR3AUS7ZJvGJkZ0mcavo6+N89gLHKaa1/81SYQRYh3R+U7Jw+QonyY5C+Hg/ByKAeL27G1jssm0Snxh4601SiZKvjXNMAB/IvT7OjwAXIp3f1CxY5mhO6mKEr4HZArjAbYMk/jJ/oePZePt9LQSgqYcAZ7lvksRP5nV2Empvd5L0rN7urkPgQAQ4B+j0yjCJT7S1cfAhC5yk7ET4fL8AZPhvEeYvXOg06QUAbfbnP9EBjABLvDJK4h/J2DSD295xknQcWBECzkA6v2WY1/keQiFH7YAlwBkhoOL0EkkT0dZG+8ElJ48WckwIsUJX0kKUmThayBEh4HAPbZEEQMi5AA6XAmhBqogAh8sqoAVp73C8MFtWAa1IqF1WAXOaatsAJVccSpoU5wt+EyGgNXbjkuwnb7+hSoyEEMPAkhYik5YCmNNUWDiajxRAK5KVEWBuI9sAc5xM2nEVMCwF0IJUGwF2eWiLxG9su9KS8Xx2hIBXEbtoSVqA5Ey81L6ChUwAb4TQjQzwordmSfwiGYs5TfqiYlrZ3KTQ57wxR+I3iZjj3XGfhwOzgp/3xBqJ7ySnHUeAF+CAAF4GprwwSOIftm2TmnG0f/Q08ArkBKAbaeAfnlkm8YVkLIbDfR//qZhWGmavDXzOC6Mk/lFFA3B/lZ8vgD+7ao3Ed2amHPfm/5D7xwEB6MYrgDcnbUg8x85mnewQAvCqYlqv5r4U7hCyyVWrJL4RtyadDgDN8nGhADYjWoiSJmN6YtxRMuCR/B9mC0A3LMQpIJImws5mS50vVMgWxbRmNRSKbRMnq4Emo9bwD8UEoBv/Bl6r3yyJX8Schf//KKb1UuGPpfYYlVGgSbCzWWLOwn9Rn5YSwMOAa4cTSrxjenzcSfgfBh4sdqG4AHRjCripLsskvmCNDDtJdqNiWkV7d+W2mb4bsXGkpEGJRy0nL392UaZKLy0A3UgC19dkmcQXosOOnv4fKKZVco5YpY3mtyCmjEkajNRMnHjUqpTsdSqM65QXgG7YiIOVJA2Gw7r/e4pplX0/XPnYON14BviLM7MkfpBJpZiORCole14xrT9WSuT05NBrgJpPqJa4S3R0pNLEjyzwXSd5OROAbrwG3O4orcRT0skk1mjFtTy3FRv1K0Y1ZwdfjzilWhIgE4P9lQZ+tgPfd5qfcwHoRhxx5ozjhWcSd0nGpivV/Vnga4ppOZoZCtWeHq4b/wJ+WtU9EteI9O+tlOQ2xbSqmtxbnQAE64G3arhPUgexiXESU2Vn7lcV+nNULwDdSCCqAsdLUCX1Yds24wP95ZJUHfpz1BIBQDdeRh4u6RvR0RHSibKbuW2oNvTnqE0AghuAv9dxv8QB6USCicGBckn+BlxXa/61C0A3UoAGlLVOUh9jfb3lun0DwKrcKp9aqCcCgG4MASuBZF35SIoSDY+WW+yRAjTFtIbqKaM+AUCua7iuYjpJVaSTSSb6yzb8rqy13s+nfgEA6MY9wH2u5CUBINLXSzZbcsztV4pp3elGOe4IQHA54Gj8WVKeqbFwuXf9rwNr3CrLPQGI8YGVyF3H6iKdSDBeesRvGLiwlv5+KdyMAKAbe4FPIzebqAk7m2Vk985SW71awLmKafW4Waa7AoDcKuMLkT2Dqgn39ZCKF324k4gn3/UFO+4LAHKziL6MnETiGGt4iNh40RU+WeBLimk960W53ggAQDceRXYPHRG3rHJj/esU09K9Kts7AQDoxp2IIWNJCdKJBOGekpu13uRWd68UbQ43FaoPTf05sNr7gpoLO5tlcNs7pRZ3bFJMy/P/M28jwAEuQ6w3lOQR7u0p5fz7cLGvXw5/BKAbWcQcgvt9Ka8JmBweKrWs+17gkkrz+d3CrwiQE8E3kEvPiVuTTBRv9P0CuNQv54OfAoDcSqM1gKcNm0ZGNPqKrrndBKz20/ngVyOwGJp6K/CtYAoPhjKNvnuAb/rtfPA7AuSjG1cCPw6sfL+xbcI9u4s5/w4Ccj4EGQFyaOrVwC1AW7CGeEu4ZzfT47Pm9GeBqxXT2hCQSUAjCABAU1cCDwGdQZviBWN9vUyNzdpxJw5cpJjW7wIyaT+NIQAATT0deAJYEbQpbhLZ20d0dNbpvCPA+U7X7nlNcG2AQnRjK3A6LbToZLx/b6Hz3wZObxTnQyMJAEA3eoAzgb8GbEndTAwOFG7iYABnuv0+v14aSwAAujEJnAv8MmhTamVyaJDJocH8nx4EzlFMayIgk0rSOG2AYmjqdcAPaaIegjUyXDila71iWjcGZU8lGlsAAJq6CvEEzQ/alEpEw6NE9vTlviaBryumtTlAkyrS+AIA0NQzgMeB5UGbUoqpsTBjfb25rxHEFK4XAjTJEc0hAABNPQZ4Cvhg0KYUMh0ZI9zbk/u6HdHNa4rdVBqvEVgK3dgFnAEEPniSjzU8lO/8R4BTm8X50EwRIB9NXQv8BJgXpBmRvXuIig2b4oi5e/cGaU8tNKcAADT1FOBR4Fi/i7b3vdjZN6HjHcQK3f/6bYcbNE8VUIhuvAqcAvzGz2KzmQzD5vac8x8CTmtW50MzR4B8NHU1cBsedxXTySQjO01SM/EYsFYxraYdrMrRGgIA0NSPIKqEE7zIPhWPM7xzB5lU6m3Euvw3vSjHb5q3CihEN94ATkWEZVeZmYoytGMbmVTqQUTIbwnnQytFgHw09WLETJsF9WY1NRYmsmdPxLaz6xp9VK8WWlMAAJqqICZanl3L7bZtE9nTx9RY+DHgcsW0HO3P3my0rgByiGiwAVji9JZ0Mkm4Z1ckMT19qWJaj3lmWwPQ+gIA0NTDgI2IDSzKEo9ajPX26plUco1iWhU35W925oYAcoi5hxuBw4pdtkaGrYmB/ovet2Py9/4aFhxzSwAAmroEuBWxVA0QgzsTA/1PR8OjqxTTqngQTysx9wSQQ1PPBjalE4nFk8ODVyzbuntOLl6duwIA0NQF1vDQQV0vvO3o8N1WZG4LQNJCI4GSmpACmONIAcxx/g9DSQgWpeUOZwAAAABJRU5ErkJggg==')
   .click().should('have.attr', 'src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA1mSURBVHic7Z15rFXVFcZ/6wKPhxImGUSpMlgoRa0YDKYKWK3USMFYoyVVa1PRNqaxztFoHVK1WmKsDYlGE7RVU4eqiGgVhRILDQ4pkapFizJYeCBCAS0+AV39Y+/3vD7u3Wefe849+w7nS3Ze8u4evrW+dYY9nL1FVcnRvCiEJpAjLPIAaHLkAdDkyAOgyZEHQJMjD4AmR/csGxORHsC3gRHAQcDQLn8PBNqBLcBHRX9XA0uA11R1T5ac48LaeAxwAnAYMBAYVPS3FdgEbATauvxdA/w9Sxul2uMAIrIfcApwOvB9oF+C6v4HLAUWA8+p6pvJGSaHiBwOnAqcCBwP7J+guu3AAuAp4HlV3ZWcoQOqmnoC+gLnAfOAXYBWKS0CpmMDOcsEiG17URXt22V9eB7Qtyp2pOyU7sDFwNYqOqVUehf4BbB/BsLvb9t6N2Mbt1rfdq/JAACmAasydkrXtA6YWkXxp9o2Qtq4CphWMwEAHA68ENgpXdNcoF+KwvezdYa2qzi9ABweLAAwXcjfAntrwBml0kZgRgriz7B1hbanVNprNShUal9FvQARaQUeBn4Qu/CXUMxzrbgrtAnTTRpUlMYA+yVo50ZVvamSgiJyA3BjgrZ3Ae9gurMdqR3T3S3uAh+AeamsFE8CZ6tqe+ySFVwRAzBdsUoidg1wJzAJaPFsrwXTtboOeAnYU0G7dxPjKsHc3e6uoJ09luN1lnMcGydZ36yp0LdLgQFVfQQAw4n/orcG+DUwPunt2HIYhrntbY/J4wmgp0f9PW3eOHVvt5yGpWTjeOuzuMGwChhelQAAjsbcpn3J7ACu9L0KKnBSb+DSmIGwBOjjqLOPzRNH+EuB3lWyscX6cEcMTm3A0akGADAa2OlJYC9wDzCoGk4pwe1g4JkYDvoL0K1EPd3sb771PAMcnJGNg6xPfV+4dwKjUwkAzEvZG54N/wM4IgunlOB5DrDNk+edJcrf6Vl2G3BOIBuPsD724fkG0JpGANzr2eBzVOlWGMNB44DNnnzPLyp3vmeZzcC4wDb2tr724XtvogAAzvZtiJSHKBM4aCx+7yq7gck27fbI3waMDW2ftbF7jAvz7IoCANP//tijgWtDO6QE99HABg/uHX3zqHwb8HymZmzntR7cPwbGxAoAoBew0qPyK0I7weGcw4D1nleJK60HDgttj8POKzxsWAn0ihMAV3pUOj+08R7OGQGsTSD+WmBEaDs87JzvYcuVpcruMxQsIr0wAxBDKI/1mIGdbY48NQERGQe8junNxEE7MEFV30qfVboQkQHACuAQR7bNmGD+tPifpdYEzsIt/l5gZj2ID2AFvLqColfXg/gAVouZGG3KYQhG230KF99KWoh+bpa8ldRywky0LIywqzgtJMAqoxTsjHp0r6fLyGzXCmZFVPBvSoyi1UPCzLz5rFTaChwUmm+FNnazGrnsm1UyAGzh1XEK11sCzvAIgDNC80xoY9RFvLr4Ii4ueFZEwQ+63j7qMQGXOGy8JDS/FOxrsVq5tDyrI3/xS+B03Jitqrsj8tQ8VPV3wIWYt+YvbFoBXGh/q2tYjWZHZOvUWlQVERHMUGe5t/8twKHapQtR7xCR/gCq+t/QXNKE7cqvw8wilsJmYKiqascd4EjcXb+5jSY+GOEbTXwAq9VcR5YhGM07HwFTI+p8MQVeObJFlGZT4csAONmRsR1YlgajHJliGUa7cjgZoGCfF5McGZdqJatNcwSF1WypI8skEelVwKxedY2TL0qVWY4s4dKuFTi+AIyKqOSl9PjkyBhR2o0qAIMdGTr6yDnqEx1jHeUwuED5viLANlX9PF1OObKC1c41azso6g7wYbqUcgSAS8PBeQA0PhIFwJaUyeTIHi4NI98B8jtA/cOl4aAC7k2bdqRMJkf2cGnYr4DZhq0cBqZMJkf2cGn4UQEzDVwOB6VMJkf2cGnYVsDszlEOQ1MmkyN7uDTcGHUHyAOg/uHSsC0qAIaISL6fcJ3Cauda6BMZAN1wdxNz1DYGYTQsh8gAALMPYI76RJR2bQXMd4AuRK0WzlG7iNJujWA+m/oP5bsL76tq1JqBHDUIEXkPGFnm543AsIKarwmeddQz0n5hm6OOYDUrJz7As8XLwhdE1Jc/BuoPUZotgC9XBb+EewXpjDQY5cgULs3ascvFCgBqTqVY7CgwUUTyQaE6gdVqoiPLYqv5V74NfMZRoABckwK3HNngGtwHgnVq3blFjIh8DbOBQDnsxuw2tTYFgjmqBBEZjtmhvMWR7RBV/QCKosT+w/UYaCHZ1uk5ssGNuMVf3CE+dDk1TESOw/01yRfAkVone+c0G2zXbyXu2//xqtr5qd9XMtofnncULgA3JyGZo6q4Gbf4zxeLDyXODRSRCcBrEQ0dq6qvVEQxR1UgIhOB5RHZjlHV14v/sU+02AxPR1Q0x56QmaMGYLWYE5Ht6a7iQ/nbxfWYvWTKYQJwqx+9HBngVowm5aAYTfdByQBQ1ZXA4xGNXi4i3/Oil6NqsBpcHpHtcavpvuW7vgMUVfwN4E3cCwo+xPQKNntwzZEyRGQI5q3f9XHP55jzBVeV+rHsG6MtcEsEh8HAg3aTqRwZwvr8QdziA9xSTnyAqD3nuuF3RNxVoffHa7YEXOWhy1IidnaNPDhSRA7BnD/j+oJoDzAp7xpmA9vl+xvg6oltB76lqq7hfeegAQC2ggsisvUA5omIawFCjhRgfTwPt/gAF0SJDx4BAKCqfwbui8h2ILDQvpjkqAKsbxdifO3CfVaz6DqjHgFFje+HOXhhbETWFcAJqrrTq+IcXhCRjkMtx0dk/RfmoItdPvV6f/RhK5wJfBaRdTzmcdDTt+4cblhfziNa/M8wh3l4iQ8xAgA6B4gu88j6HeDh/Kui5LA+fBjj0yhcVm7Apywq7ILMxu/kjXtCd5fqPWGOjPXx9eyK6q+QlAAPeBK7ObQT6zVhpnd9fPwAFR5xk4Rcd8zSYh+Ct4d2Zr0l4HZP3y4gwamtSUn2wmxK7EN0TqVR2kzJ3l3nePp0GWUOhMwkACzh/phJIx/Cc4FCaCfXasK8lM/19OWbQP+kbXqPA7ggIgfbaDzUI/sjwLmq6jrjrukgIt0xkzszPbKvA45T1Q2J200jAABEZAxmfNpnP4GngR+qatSYQlPA9vMfBU7zyL4FM+/yThptp9ZPt4Sm4N5zqAOnAfPt6GJTw/pgPn7ibwSmpCU+pHgH6KxQZBRmn3qfx8HLwAxVbcr9CEWkL0b8yR7Z1wEnqep7qXJIOwCgcwp5EeYI9yi8BZyqHjNXjQTro+cAn0/vV2PET91HVRmqtUQnA297ZB8HLBeRqHHuhoG1dTl+4r8NTK7WBVK1sXpVbcO8E/gcODEUeFlETq0Wn1qBtfFl/LbgW4F55kft41QxqjpZo6ofAScS/cECQG/Mi+HPqskpJKxt8zG2RmE5cKL1YfWQ0QBHb8xcts8AhwK30UCjhpjRvdti2L8E6J0Jtwyd0Ao8FsMJjwA9Q4uXgt09rS2+dj8GtGbGL2NnCP5TyYoZWBoQWsQE9g6wNvjaOzvrO18ox1wE7PV0yjvAyNBiVmDjSMvdx8a9wEVBeAZ00HTgE08HfQhMDC1qDNsmWs4+tn0CTA/GNbCjJgCbPB21Czg9tLgeNp1uufrYtAmzgDMc3xpw2HDMYIePwz4HLgnN2WHLLy1HH1veBoYH5xyagHVcf+J1E++ihtYVYMZT7orBfwkpzOU3TABYJ7YAD8Vw4lMkXA2TEu9elosv74eAltC8ay4ArDMF80WyrzNfAQYH5DvYcvDlews1NsAVnEAZx87CfHDq49T3gLEBOI6xbftw3APMCu3XugkA6+BTgJ2eDt4OfDdDblMwhzL7cNsJnBLan3UXANbRRwEbYlxl52fA6ceYT7B8OG0Ajgrtx7oNAOvwYZhtUHyfs7+p1nMWuCkGj5XAsND+q/sAsI7vA7wYw/mPkuKECmZCJ04P5UWgT2i/NUwAWBF6APfHEGEZMDCFdg/ALODwbfd+oEdofzVcABQJckMMMVZjdjivtK2vA+/GaO/60P5p+ACwwpyL/4vYNsyyqrhtTMIcrO3TxmfAOaH90jQBYAWaAmyNIdC5Mer+EeZYFZ+6t2IWbQb3SVMFgBVqtL3N+96ib/Co81cxHzGjQ/uhaQPACjYQ/y+UFfgjJcbiMXMRf4hRz1JSeMkMnYITSCkIWom37m4JRbNxmNnIv8Yo/ycaYL1iwwSAFVEwu2b7irgKGIVZurUqRrmam9BJkqryaVhIiMhPMfvq+Jxn0LHmfqBH3j3Az1V1bqXcahENFwAAInIS8ATQN6UqdwBnqOqilOqrGTRkAACIyDcxZyIPT1jVWmCaqvp851h3aNh9/KxgxwKvJqjmVcz5SA0pPjRwAACoOcjiBODJCoo/idnytqEPw2joAABQ1U+BM4E7YhS7AzjTlm1oNOw7QCmIyDTg95iuXym8D1ysqs9mxyosmioAAESkFfgJ5qOUI+y//4nZCf0BVW0PRC0Imi4AcnwVDf8OkMONPACaHHkANDnyAGhy5AHQ5MgDoMnxf0LfftPf3Ph1AAAAAElFTkSuQmCC')
})
it('Should have a info button on the featured dog', () => {
  cy.intercept('GET', 'https://api.thedogapi.com/v1/breeds', { body: [{
        weight: {
        imperial: "65 - 100",
        metric: "29 - 45"
        },
        height: {
        imperial: "23 - 25",
        metric: "58 - 64"
        },
        id: 9,
        name: "Alaskan Malamute",
        bred_for: "Hauling heavy freight, Sled pulling",
        breed_group: "Working",
        life_span: "12 - 15 years",
        temperament: "Friendly, Affectionate, Devoted, Loyal, Dignified, Playful",
        reference_image_id: "dW5UucTIW",
        image: {
        id: "dW5UucTIW",
        width: 1023,
        height: 769,
        url: "https://cdn2.thedogapi.com/images/dW5UucTIW.jpg"
        },
    }]
  }).as('random-featured-dog')
  cy.visit('http://localhost:3000')
  cy.get('.featured-dogs-container > :nth-child(1)')
  cy.wait('@random-featured-dog')
  .get('img[class="info-icon"]')
  .click().url().should('include', 'http://localhost:3000/Alaskan%20Malamute')
})
})