import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../services/requests"
import { useSetNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
  const setNotification = useSetNotification()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      setNotification(`anecdote '${newAnecdote.content}' created`, 5)
    },
    onError: () => {
      setNotification(`anecdote too short, the server requires that the content of the anecdote to be added is at least 5 characters long`, 5)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
