import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ( {text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ( {good, neutral, bad} ) => {
  
  if ( (good + neutral + bad) === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100
  
  return (
    <table>
        <StatisticLine text="good" value={good} /> <br />
        <StatisticLine text="neutral" value={neutral} /> <br />
        <StatisticLine text="bad" value={bad} /> <br />
        <StatisticLine text="all" value={all} /> <br />
        <StatisticLine text="average" value={average.toFixed(2)} /> <br />
        <StatisticLine text="positive" value={positive.toFixed(2) + " %"} /><br />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>

      <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App