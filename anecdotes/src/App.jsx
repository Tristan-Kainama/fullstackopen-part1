import { useState } from 'react'

const Most = (props) => {
  const total = props.votes.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  if (total == 0) {
    return (
      <>
        <p>There has been no votes done.</p>
      </>
    )
  }

  return (
    <>
      <p>{props.most}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [most, setMost] = useState("")

  const updateMost = (votes) => {
    const maxIdx = votes.indexOf(Math.max(...votes));
    setMost(anecdotes[maxIdx])
  }

  const handleNextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length));
    setSelected(randomNumber)
    updateMost(votes)
  }

  const handleVoteButton = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    updateMost(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleVoteButton}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Most votes={votes} most={most}/>
    </div>
  )
}

export default App