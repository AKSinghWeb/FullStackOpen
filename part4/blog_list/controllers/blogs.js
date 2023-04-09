const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, ) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).send({ error: 'Bad Request' })
  }

  const decodedUser = request.user
  if (!decodedUser.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedUser.id)

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201)
  response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedUser = request.user

  if (!decodedUser.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user._id.toString() === decodedUser.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unauthorised user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const decodedUser = request.user

  if (!decodedUser.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true }
  )
  response.status(200)
  response.json(updatedBlog)
})

module.exports = blogsRouter
