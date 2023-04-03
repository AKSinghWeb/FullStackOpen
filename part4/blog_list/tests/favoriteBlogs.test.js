const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    const blogs= [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f6',
        title: 'Go ',
        author: 'E',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go',
        author: 'Edsg',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
      }
    ]
  
    test('when list has three blogs with 5, 10, 15 likes result equals to 15 ', () => {
      const result = listHelper.favoriteBlogs(blogs)
      expect(result).toEqual({title: 'Go', author: 'Edsg',likes: 15})
    })
  })