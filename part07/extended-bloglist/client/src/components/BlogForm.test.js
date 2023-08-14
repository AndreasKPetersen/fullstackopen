import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('form calls event handler with right details when a blog is created', async () => {
    const createBlogMockHandler = jest.fn()

    const { container } = render(<BlogForm
      createBlog={createBlogMockHandler}
    />)

    const titleInput = container.querySelector('.title')
    const authorInput = container.querySelector('.author')
    const urlInput = container.querySelector('.url')
    const createButton = container.querySelector('.createButton')

    const titleInputText = 'title testing'
    const authorInputText = 'author testing'
    const urlInputText = 'url testing'

    await userEvent.type(titleInput, titleInputText)
    await userEvent.type(authorInput, authorInputText)
    await userEvent.type(urlInput, urlInputText)
    await userEvent.click(createButton)

    expect(createBlogMockHandler.mock.calls).toHaveLength(1)
    expect(createBlogMockHandler.mock.calls[0][0].title).toBe(titleInputText)
    expect(createBlogMockHandler.mock.calls[0][0].author).toBe(authorInputText)
    expect(createBlogMockHandler.mock.calls[0][0].url).toBe(urlInputText)
  })
})

