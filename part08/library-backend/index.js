const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")

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

type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
}
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (obj, args) => Author.find({}),
  },
  Mutation: {
    addBook: async (obj, args) => {
      let currentAuthor = await Author.findOne({ name: args.author })

      if (!currentAuthor) {
        currentAuthor = new Author({ name: args.author })
        await currentAuthor.save()
      }

      const book = new Book({ ...args, author: currentAuthor.id })
      return book.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
