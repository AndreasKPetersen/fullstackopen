import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, incrementAnecdoteVote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementAnecdoteVote(id))
  }

  const create = ( event ) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(function(a, b) { 
        return b.votes - a.votes  ||  a.content.localeCompare(b.content);
        }).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App