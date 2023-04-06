const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'ttps://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

const rootUser = {
  username: 'root',
  name: 'superuser',
  password: '1234',
}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(rootUser.password, saltRounds)

  let userObject = new User({
    username: rootUser.username,
    name: rootUser.name,
    passwordHash: passwordHash,
  })
  await userObject.save()

  let blogObject = new Blog({ ...initialBlogs[0], user: userObject._id })
  await blogObject.save()
  blogObject = new Blog({ ...initialBlogs[1], user: userObject._id })
  await blogObject.save()
  blogObject = new Blog({ ...initialBlogs[2], user: userObject._id })
  await blogObject.save()
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('unique identifier property of blog posts is id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('new blog is created', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }

  const user = await User.findOne({ username: rootUser.username })
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('like property default to 0 when missing', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  const user = await User.findOne({ username: rootUser.username })
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('when missing title or url responds with status code 400 and not added', async () => {
  const newBlog = {
    author: 'Robert Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  const user = await User.findOne({ username: rootUser.username })
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = (await api.get('/api/blogs')).body
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
})

test("a blog's likes can be updated", async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = { ...blogsAtStart.body[0], likes: 4 }
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)

  const blogsAtEnd = (await api.get('/api/blogs')).body
  expect(blogsAtEnd[0].likes).toBe(4)
})

test('an invalid user is not created', async () => {
  const invalidUser = {
    username: 'ro',
    name: 'superuser',
    password: '14',
  }

  await api.post('/api/users').send(invalidUser).expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(1)
})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
