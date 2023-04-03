const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0

  blogs.forEach((element) => {
    sum = sum + element.likes
  })
  return sum
}

const favoriteBlogs = (blogs) => {
  let mostLikes = blogs[0].likes
  let blog = blogs[0]

  blogs.forEach((item) => {
    if (mostLikes < item.likes) blog = item
  })
  return { title: blog.title, author: blog.author, likes: blog.likes }
}

const mostBlogs = (blogs) => {
  const groupByAuthor = Object.values(_.groupBy(blogs, 'author'))

  const maxBlogs = _.maxBy(groupByAuthor, (o) => o.length)

  return { author: maxBlogs[0].author, blogs: maxBlogs.length }
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  let author = ''
  let likes = 0

  for (const [key, value] of Object.entries(authors)) {
    const sum = _.sumBy(value, (o) => o.likes)
    if (sum >= likes) {
      author = key
      likes = sum
    }
  }
  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
}
