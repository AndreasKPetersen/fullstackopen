import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAnecdotes, updateAnecdote } from './services/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useSetNotification } from "./NotificationContext"

const App = () => {
  const queryClient = useQueryClient()

  const setNotification = useSetNotification()
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(votedAnecdote)
    setNotification(`anecdote '${anecdote.content}' voted`, 5)
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes
  )
  console.log(result)

  if ( result.isLoading ) {
    return (
      <div>anecdote service loading...</div>
    )
  }

  if ( result.isError ) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  } 

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
