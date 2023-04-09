import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, NotificationError } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogLoggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('blogLoggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUserMessage(`${user.name} successfully logged in`)
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setUserMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('something went wrong!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId)
    const changedblog = { ...blog, likes: blog.likes + 1 }

    try {
      const response = await blogService.update(blog.id, changedblog)
      setBlogs(blogs.map((blog) => (blog.id !== blogId ? blog : response)))
      setUserMessage(
        `blog ${changedblog.title} by ${changedblog.author} likes were increased to ${changedblog.likes}`
      )
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('something went wrong!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId)

    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
      setUserMessage(`blog ${blog.title} by ${blog.author} deleted!`)
      setTimeout(() => {
        setUserMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('something went wrong!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogLoggedInUser')
    setUserMessage(`${user.name} successfully logged out`)
    setTimeout(() => {
      setUserMessage(null)
    }, 5000)
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <Notification message={userMessage} />
      <NotificationError message={errorMessage} />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
