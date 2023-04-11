import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const remove = () => {
    if (blog.user.username === user.username) {
      return (
        <>
          <br />
          <button id="remove" onClick={handleDelete}>
            Remove
          </button>
        </>
      )
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeChange = () => {
    updateLikes(blog.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  if (visible) {
    return (
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>Hide</button>
        <br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleLikeChange}>like</button>
        <br />
        {blog.user.name}
        {remove()}
      </div>
    )
  }
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button id="view" onClick={toggleVisibility}>
        View
      </button>
    </div>
  )
}

export default Blog
