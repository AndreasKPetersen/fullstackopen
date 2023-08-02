import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 10,
    user: {
      username: 'username',
      name: 'name'
    }
  }

  const user = {
    username: 'username'
  }

  const updateLikesMockHandler = jest.fn()
  const deleteBlogMockHandler = jest.fn()

  beforeEach(() => {


    component = render(<Blog
      blog={blog}
      updateLikes={updateLikesMockHandler}
      user={user}
      deleteBlog={deleteBlogMockHandler}
    />)
  })

  test('renders title and author, but not URL or number of likes by default', () => {
    const blogContainer = component.container.querySelector('.blog')
    expect(blogContainer).toHaveTextContent(blog.title)
    expect(blogContainer).toHaveTextContent(blog.author)
    expect(blogContainer).not.toHaveTextContent(blog.url)
    expect(blogContainer).not.toHaveTextContent(blog.likes)
    expect(blogContainer).not.toHaveTextContent(blog.user.username)
  })

  test('URL and number of likes shown when button controlling details clicked', async () => {
    const user = userEvent.setup()
    const button = component.container.querySelector('.visibilityButton')
    await user.click(button)

    const blogDetailsContainer = component.container.querySelector('.blogDetails')
    expect(blogDetailsContainer).toBeDefined()

    const blogContainer = component.container.querySelector('.blog')
    expect(blogContainer).toHaveTextContent(blog.url)
    expect(blogContainer).toHaveTextContent(blog.likes)
    expect(blogContainer).toHaveTextContent(blog.user.username)
  })
})

