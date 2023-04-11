import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog renders only title and author', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'ttps://reactpatterns.com/',
    likes: 7,
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(div).not.toHaveTextContent(`${blog.url}`)
  expect(div).not.toHaveTextContent(`likes: ${blog.likes}`)
})

test('when view button clicked url and likes are shown for a blog', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'ttps://reactpatterns.com/',
    likes: 7,
  }

  const { container } = render(<Blog blog={blog} user={{ user: 'root' }} />)

  const user = userEvent.setup()
  const button = container.querySelector('#view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.url}`)
  expect(div).toHaveTextContent(`likes: ${blog.likes}`)
})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'ttps://reactpatterns.com/',
    likes: 7,
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} user={{ user: 'root' }} updateLikes={mockHandler} />
  )

  const user = userEvent.setup()
  const button = container.querySelector('#view')
  await user.click(button)

  const likeBtn = screen.getByText('like')
  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
