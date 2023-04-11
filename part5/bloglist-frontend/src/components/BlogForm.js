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
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            id='title'
            placeholder='write title here'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            id='author'
            placeholder='write author here'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="URL"
            id='url'
            placeholder='write url here'
            onChange={handleUrlChange}
          />
        </div>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
