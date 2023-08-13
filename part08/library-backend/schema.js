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

type Subscription {
    bookAdded: Book!
}
`

module.exports = typeDefs
