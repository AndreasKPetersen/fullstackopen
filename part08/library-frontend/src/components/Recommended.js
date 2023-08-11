import { useQuery } from "@apollo/client"
import { ALL_BOOKS, USER } from "../queries"

const Recommended = (props) => {
  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(USER)

  if (!props.show) {
    return null
  }

  if (bookResult.loading || userResult.loading) {
    return <div>loading...</div>
  }

  const books = bookResult.data.allBooks
  const favoriteGenre = userResult.data.me.favoriteGenre

  const booksToShow = !favoriteGenre
    ? books
    : books.filter((book) => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
