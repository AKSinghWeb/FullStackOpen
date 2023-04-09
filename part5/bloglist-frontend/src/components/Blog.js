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
      <div style={blogStyle}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>Hide</button>
        <br />
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleLikeChange}>like</button>
        <br />
        {user.name}
        <br />
        <button onClick={handleDelete}>Remove</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>View</button>
    </div>
  )
}

export default Blog
