import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({feedback, count, average, positive}) => {
  if(count === 0) {
    return (
      <div className='statistics'>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div className='statistics'>
      <table>
        <tbody>
          {Object.keys(feedback).map(k => 
            <tr key={k}><td>{k}</td><td>{feedback[k]}</td> 
            </tr>)}
            <tr key="all"><td>all</td><td>{count}</td></tr>
            <tr key="average"><td>average</td><td>{average}</td></tr>
            <tr key="positive"><td>positive</td><td>{positive}</td></tr>
        </tbody>
      </table>

    </div>
  )
}

function App() {
  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [count, setCount] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = {...feedback, good: feedback.good + 1}
    const updatedCount = count + 1
    const updatedAverage = (updatedGood.good - updatedGood.bad) / updatedCount
    const updatedPositive = (updatedGood.good / updatedCount) * 100
    setFeedback(updatedGood)
    setCount(updatedCount)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = {...feedback, neutral: feedback.neutral + 1}
    const updatedCount = count + 1
    const updatedAverage = (updatedNeutral.good - updatedNeutral.bad) / updatedCount
    const updatedPositive = (updatedNeutral.good / updatedCount) * 100
    setFeedback(updatedNeutral)
    setCount(updatedCount)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  const handleBadClick = () => {
    const updatedBad = {...feedback, bad: feedback.bad + 1}
    const updatedCount = count + 1
    const updatedAverage = (updatedBad.good - updatedBad.bad) / updatedCount
    const updatedPositive = (updatedBad.good / updatedCount) * 100
    setFeedback(updatedBad)
    setCount(updatedCount)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button text="good" handleClick={handleGoodClick}/>
        <Button text="neutral" handleClick={handleNeutralClick}/>
        <Button text="bad" handleClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics feedback={feedback} count={count} average={average} positive={positive}/>
    </div>

  )
}

export default App
