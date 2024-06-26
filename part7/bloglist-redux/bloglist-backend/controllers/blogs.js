const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({ user: user.id, ...request.body })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await savedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)

  if (
    !user.id || blogToDelete ? blogToDelete.user.toString() !== user.id : false
  ) {
    return response.status(401).json({ error: 'token invalid' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.splice(user.blogs.indexOf(request.params.id), 1)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const requestBlog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    requestBlog,
    { new: true }
  )

  if (!updatedBlog) {
    response.status(404).end()
  }

  await updatedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(updatedBlog)
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const newComment = request.body.newComment

  const commentedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: newComment } },
    { new: true }
  )

  if (!commentedBlog) {
    response.status(404).end()
  }
  response.json(commentedBlog)
})

module.exports = blogsRouter
