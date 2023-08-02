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
      cy.get('.username').type(user.username)
      cy.get('.password').type(user.password)
      cy.get('.loginButton').click()

      cy.contains(`${user.username} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('.username').type(user.username)
      cy.get('.loginButton').click()

      cy.get('.errorMessage')
    })
  })
})