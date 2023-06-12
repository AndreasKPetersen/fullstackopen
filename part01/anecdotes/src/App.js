import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  // Number of quotes/anecdotes
  const quoteCount = anecdotes.length

  // Hooks
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(quoteCount).fill(0))

  // Voting function
  const Vote = () => {
    const copyVotes = [ ...votes ]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  // Finding max number of votes and position thereof
  const MaxVotes = () => (
    votes.indexOf( Math.max(...votes) )
  )
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <Button handleClick={() => Vote()} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * quoteCount)) } text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      {anecdotes[MaxVotes()]} <br />
      has {votes[MaxVotes()]} votes <br />
    </div>
  )
}

export default App