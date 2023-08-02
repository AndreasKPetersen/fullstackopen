describe('Blog app', function() {
  let user1, user2

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    user1 = {
      username: 'username1',
      name: 'name1',
      password: 'password1'
    }
    user2 = {
      username: 'username2',
      name: 'name2',
      password: 'password2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened and login form is shown by default', function() {
    cy.contains('Blogs')
    cy.get('.loginForm')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input.username').type(user1.username)
      cy.get('input.password').type(user1.password)
      cy.get('button.loginButton').click()

      cy.contains(`${user1.username} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input.username').type(user1.username)
      cy.get('button.loginButton').click()

      cy.get('div.errorMessage')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input.username').type(user1.username)
      cy.get('input.password').type(user1.password)
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

  describe('When logged in and a blog is created', function() {
    beforeEach(function() {
      cy.get('input.username').type(user1.username)
      cy.get('input.password').type(user1.password)
      cy.get('button.loginButton').click()

      cy.get('input.title').type('title')
      cy.get('input.author').type('author')
      cy.get('input.url').type('url')
      cy.get('button.createButton').click()
    })

    it('a blog can be liked', function() {
      cy.get('button.visibilityButton').click()
      cy.get('.likes').should('contain', '0')
      cy.get('button.likeButton').click()
      cy.get('.likes').should('contain', '1')
    })
  })
})