import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />)
  })

  test('renders title and author, but not URL or number of likes by default', () => {

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.user.username)
  })
})

