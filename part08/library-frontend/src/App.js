import { useState } from "react"

import Authors from "./components/Authors"
import Books from "./components/Books"
import LoginForm from "./components/LoginForm"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import Recommended from "./components/Recommended"

import { useApolloClient } from "@apollo/client"
import { useSubscription } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED } from "./queries"

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    },
  })

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} setError={notify} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={notify} />
      <Recommended show={page === "recommended"} />
    </div>
  )
}

export default App
