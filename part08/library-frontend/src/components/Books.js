import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const filteredResult = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
    fetchPolicy: "no-cache",
  })
  filteredResult.refetch()

  if (!props.show) {
    return null
  }

  if (result.loading || filteredResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const filteredBooks = filteredResult.data.allBooks

  const genres = []
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            value={genre}
            onClick={({ target }) => {
              setFilter(target.value)
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
