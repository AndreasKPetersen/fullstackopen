import { useSelector, useDispatch } from 'react-redux'
import { incrementAnecdoteVote } from '../reducers/anecdoteReducer'

/*
({ anecdotes, filter }) => {
        if ( filter === '' ) {
            return anecdotes
        } else {
            return anecdotes.filter(anecdote => anecdote.includes(filter))
        }
*/

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector( state => state.anecdotes )
    const filter = useSelector( state => state.filter )

    const vote = (id) => {
        dispatch(incrementAnecdoteVote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList