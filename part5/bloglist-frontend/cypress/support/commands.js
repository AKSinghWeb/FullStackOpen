Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('blogLoggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, url, author,likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, url, author,likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('blogLoggedInUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})
