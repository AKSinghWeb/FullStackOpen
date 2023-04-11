describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'superuser',
      username: 'root',
      password: '1234',
    }
    const user2 = {
      name: 'superuser2',
      username: 'root2',
      password: '1234',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'root', password: '1234' })
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('0000')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: '1234' })
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'cypress test',
        url: 'abc.com',
        author: 'abcd',
      })
      cy.contains('cypress test abcd')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'cypress test',
        url: 'abc.com',
        author: 'abcd',
        likes: 10,
      })

      cy.get('#view').click()
      cy.contains('like').click()
      cy.contains('likes: 11')
    })

    it('blog can be deleted by a user who created it', function () {
      cy.createBlog({
        title: 'cypress test',
        url: 'abc.com',
        author: 'abcd',
        likes: 10,
      })
      cy.createBlog({
        title: 'cypress test2',
        url: 'abc.com',
        author: 'abcd',
        likes: 12,
      })

      cy.contains('cypress test2').contains('View').click()
      cy.contains('cypress test2').contains('Remove').click()

      cy.contains('cypress test2').contains('View').should('not.exist')
    })

    it('blog can be deleted by a user who created it', function () {
      cy.createBlog({
        title: 'cypress test',
        url: 'abc.com',
        author: 'abcd',
        likes: 10,
      })
      cy.createBlog({
        title: 'cypress test2',
        url: 'abc.com',
        author: 'abcd',
        likes: 12,
      })

      cy.contains('cypress test2').contains('View').click()
      cy.contains('cypress test2').contains('Remove').click()

      cy.contains('cypress test2').contains('View').should('not.exist')
    })

    it('remove button only visible to user who created the blog', function () {
      cy.createBlog({
        title: 'cypress test1',
        url: 'abc.com',
        author: 'abcd',
        likes: 10,
      })

      cy.contains('logout').click()
      cy.login({ username: 'root2', password: '1234' })

      cy.createBlog({
        title: 'cypress test2',
        url: 'abc.com',
        author: 'abcd',
        likes: 12,
      })
      cy.contains('cypress test1').contains('View').click()
      cy.contains('cypress test1').contains('Remove').should('not.exist')
      cy.contains('cypress test2').contains('View').click()
      cy.contains('cypress test2').contains('Remove')
    })

    it('blogs are ordered by number of likes', function () {
      cy.createBlog({
        title: 'cypress test1',
        url: 'abc.com',
        author: 'abcd',
        likes: 10,
      })
      cy.createBlog({
        title: 'cypress test2',
        url: 'abc.com',
        author: 'abcd',
        likes: 12,
      })
      cy.createBlog({
        title: 'cypress test3',
        url: 'abc.com',
        author: 'abcd',
        likes: 20,
      })
      cy.createBlog({
        title: 'cypress test4',
        url: 'abc.com',
        author: 'abcd',
        likes: 6,
      })
      cy.get('.blog').eq(0).should('contain', 'cypress test3')
      cy.get('.blog').eq(1).should('contain', 'cypress test2')
    })
  })
})
