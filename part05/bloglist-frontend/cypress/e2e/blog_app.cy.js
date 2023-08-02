describe('Blog app', function() {
  let user

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    user = {
      username: 'username',
      name: 'name',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened and login form is shown by default', function() {
    cy.contains('Blogs')
    cy.get('.loginForm')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input.username').type(user.username)
      cy.get('input.password').type(user.password)
      cy.get('button.loginButton').click()

      cy.contains(`${user.username} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input.username').type(user.username)
      cy.get('button.loginButton').click()

      cy.get('div.errorMessage')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input.username').type(user.username)
      cy.get('input.password').type(user.password)
      cy.get('button.loginButton').click()
    })

    it('A blog can be created', function() {
      cy.get('input.title').type('title')
      cy.get('input.author').type('author')
      cy.get('input.url').type('url')
      cy.get('button.createButton').click()

      cy.get('div.blog')
    })
  })
})