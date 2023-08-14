const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

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
        await book.save()
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        })
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") })

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
}

module.exports = resolvers
