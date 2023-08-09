import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"

const EditAuthor = ({ names, setError }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => setError(error.graphQLErrors[0].message),
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("author not found")
    }
  }, [result.data]) // eslint-disable-line

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
          author
          <select
            required
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="" hidden disabled>
              Select author
            </option>
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
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
