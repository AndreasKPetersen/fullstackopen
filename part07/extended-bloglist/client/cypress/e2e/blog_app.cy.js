describe('Blog app', function() {
  let user1, user2

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
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
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
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
    let credentialsUser1, credentialsUser2

    beforeEach(function() {
      credentialsUser1 = { username: user1.username, password: user1.password }
      credentialsUser2 = { username: user2.username, password: user2.password }
      cy.login(credentialsUser1)
    })

    it('A blog can be created', function() {
      cy.get('input.title').type('title')
      cy.get('input.author').type('author')
      cy.get('input.url').type('url')
      cy.get('button.createButton').click()

      cy.get('div.blog')
    })

    describe('and multiple blogs are created', function() {
      let blog1, blog2, blog3

      beforeEach(function() {
        blog1 = {
          title: 'title1',
          author: 'author1',
          url: 'url1'
        }
        blog2 = {
          title: 'title2',
          author: 'author2',
          url: 'url2'
        }
        blog3 = {
          title: 'title3',
          author: 'author3',
          url: 'url3'
        }

        cy.createBlog(blog1)
        cy.createBlog(blog2)
        cy.createBlog(blog3)
      })

      it('a blog can be liked', function() {
        cy.contains(blog1.title).parent().find('.visibilityButton').click()
        cy.get('.likeButton').click()
      })

      it('a blog can be deleted', function() {
        cy.contains(blog1.title).parent().find('.visibilityButton').click()
        cy.get('.deleteButton').click()
        cy.get('html').should('not.contain', blog1.title)
      })

      it('a blog can only be deleted by user who created blog', function() {
        cy.contains('logout').click()
        cy.login(credentialsUser2)
        cy.contains(blog1.title).parent().find('.visibilityButton').click()
        cy.get('html').should('not.contain', '.deleteButton')
      })

      it('blogs are ordered according to likes', function() {
        cy.get('.visibilityButton').click({ multiple: true })
        cy.contains(blog2.title).parent().parent().find('.likeButton').click()
        cy.get('.blog').eq(0).should('contain', blog2.title)
        cy.get('.blog').eq(1).should('contain', blog1.title)
        cy.get('.blog').eq(2).should('contain', blog3.title)
      })
    })
  })

})