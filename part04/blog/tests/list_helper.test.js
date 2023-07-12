const listHelper = require('../utils/list_helper')
const { zeroBlogs, oneBlogs, manyBlogs } = require('../utils/blogs_helper')

describe('dummy', () => {
  test('Always return 1', () => {
    const result = listHelper.dummy(zeroBlogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {
  test('List with zero blogs', () => {
    const result = listHelper.totalLikes(zeroBlogs)
    expect(result).toBe(0)
  })
})

describe('totalLikes', () => {
  test('List with one blogs', () => {
    const result = listHelper.totalLikes(oneBlogs)
    expect(result).toBe(7)
  })
})

describe('totalLikes', () => {
  test('List with many blogs', () => {
    const result = listHelper.totalLikes(manyBlogs)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {
  test('List with zero blogs', () => {
    const result = listHelper.favoriteBlog(zeroBlogs)
    expect(result).toBe(null)
  })
})

describe('favoriteBlog', () => {
  test('List with many blogs', () => {
    const result = listHelper.favoriteBlog(oneBlogs)
    expect(result).toEqual(
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      }
    )
  })
})

describe('favoriteBlog', () => {
  test('List with many blogs', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual(
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      }
    )
  })
})

describe('mostBlogs', () => {
  test('List with zero blogs', () => {
    const result = listHelper.mostBlogs(zeroBlogs)
    expect(result).toBe(null)
  })
})

describe('mostBlogs', () => {
  test('List with one blogs', () => {
    const result = listHelper.mostBlogs(oneBlogs)
    expect(result).toEqual('Michael Chan')
  })
})

describe('mostBlogs', () => {
  test('List with many blogs', () => {
    const result = listHelper.mostBlogs(manyBlogs)
    expect(result).toEqual('Robert C. Martin')
  })
})

describe('mostLikes', () => {
  test('List with zero blogs', () => {
    const result = listHelper.mostLikes(zeroBlogs)
    expect(result).toBe(null)
  })
})

describe('mostLikes', () => {
  test('List with one blogs', () => {
    const result = listHelper.mostLikes(oneBlogs)
    expect(result).toEqual({ 'author': 'Michael Chan', 'likes': 7 })
  })
})

describe('mostLikes', () => {
  test('List with many blogs', () => {
    const result = listHelper.mostLikes(manyBlogs)
    expect(result).toEqual({ 'author': 'Edsger W. Dijkstra', 'likes': 12 })
  })
})