const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")

const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
type Query {
    me: User
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(
        author: String
        genre: String
    ): [Book!]!
}

type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
}  

type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
}

type Token {
    value: String!
  }

type User {
    username: String!
    favoriteGenre: String!
    id: ID!
}

type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    login(
        username: String!
        password: String!
    ): Token
}
`

const resolvers = {
  Query: {
    me: (obj, args, context) => {
      return context.currentUser
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (obj, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          return null
        }

        const books = await Book.find({
          $and: [
            { author: { $eq: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author")

        return books
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          return null
        }

        const books = await Book.find({ author: { $eq: author.id } }).populate(
          "author"
        )

        return books
      }

      if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          "author"
        )

        return books.filter((book) => book.genres.includes(args.genre))
      }

      return await Book.find({}).populate("author")
    },
  },
  Author: {
    bookCount: async (obj, args) => {
      const books = await Book.find({}).populate("author")

      return books.filter((book) => book.author.name === obj.name).length
    },
  },
  Mutation: {
    addBook: async (obj, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      let currentAuthor = await Author.findOne({ name: args.author })

      if (!currentAuthor) {
        currentAuthor = new Author({ name: args.author })

        try {
          await currentAuthor.save()
        } catch (error) {
          throw new GraphQLError("Adding author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author: currentAuthor.id })

      try {
        const result = await book.save()
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        })
      }

      return book.populate("author")
    },
    createUser: async (obj, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      }

      return user
    },
    editAuthor: async (obj, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      let currentAuthor = await Author.findOne({ name: args.name })

      if (!currentAuthor) {
        return null
      }

      currentAuthor.born = args.setBornTo

      return currentAuthor.save()
    },
    login: async (obj, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
