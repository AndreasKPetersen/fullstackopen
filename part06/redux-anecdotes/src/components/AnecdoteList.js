import { useSelector, useDispatch } from 'react-redux'
import { incrementAnecdoteVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector( state => state.anecdotes )
    const filter = useSelector( state => state.filter )

    const vote = async (anecdote) => {
        dispatch(incrementAnecdoteVote(anecdote))
        dispatch(notificationChange(anecdote.content))
        setTimeout(() => dispatch(notificationChange(null)), 5000)
    }

    return (
        <div>
            {anecdotes
                .filter( anecdote => anecdote.content.includes(filter) )
                .sort(function(a, b) { 
                    return b.votes - a.votes  ||  a.content.localeCompare(b.content);
                })
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList