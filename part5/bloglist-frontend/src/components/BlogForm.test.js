import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing title field')
  await user.type(author, 'testing author field')
  await user.type(url, 'testing url field')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title field')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author field')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url field')

})
