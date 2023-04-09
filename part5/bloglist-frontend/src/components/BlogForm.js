import { useState } from 'react'

const BlogForm = (props) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewURL] = useState('')

  const handleTitleChange = ({ target }) => {
    setNewTitle(target.value)
  }
  const handleAuthorChange = ({ target }) => {
    setNewAuthor(target.value)
  }
  const handleUrlChange = ({ target }) => {
    setNewURL(target.value)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }
    props.createBlog(blogObject)

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
