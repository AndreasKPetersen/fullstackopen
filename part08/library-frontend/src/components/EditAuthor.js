import { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const EditAuthor = ({ show, setError }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, born } })

    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
