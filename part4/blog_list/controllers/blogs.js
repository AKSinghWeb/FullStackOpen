const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).send({ error: 'Bad Request' })
  } else {
    const blog = new Blog({ ...request.body, likes: request.body.likes || 0 })

    const result = await blog.save()
    response.status(201)
    response.json(result)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter
