import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.function}>{props.name}</button>
    </>
  )
}

const Statistic = (props) => {
  return (
    <>
      <th>{props.name}</th>
      <th>{props.statistic}</th>
    </>
  )
}

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <tr><Statistic name="good" statistic={props.good}/></tr>
          <tr><Statistic name="neutral" statistic={props.neutral}/></tr>
          <tr><Statistic name="bad" statistic={props.bad}/></tr>
          <tr><Statistic name="all" statistic={props.all}/></tr>
          <tr><Statistic name="average" statistic={props.average}/></tr>
          <tr><Statistic name="positive" statistic={props.positive} /></tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState("0 %")

  const countAverage = (newGood, newBad, newAll) => {
    const totalScore = newGood - newBad;
    const newAverage = totalScore/newAll;

    setAverage(newAverage);
  }

  const countPositive = (newGood, newAll) => {
    const newPositive = (newGood / newAll) * 100;
    const positiveString = newPositive + " %";

    setPositive(positiveString);
  }

  const handleGoodButton = () => {
    const newGood = good+1
    const newAll = newGood+bad+neutral

    setGood(newGood)
    setAll(newAll)
    countAverage(newGood, bad, newAll);
    countPositive(newGood, newAll);
  };

  const handleNeutralButton = () => {
    const newNeutral = neutral+1;
    const newAll = good+newNeutral+bad;

    setNeutral(newNeutral);
    setAll(newAll);
    countAverage(good, bad, newAll);
    countPositive(good, newAll);
  };
  const handleBadButton = () => {
    const newBad = bad+1;
    const newAll = good+neutral+newBad;
    
    setBad(newBad);
    setAll(newAll);
    countAverage(good, newBad, newAll);
    countPositive(good, newAll);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" function={handleGoodButton}/>
      <Button name="neutral" function={handleNeutralButton}/>
      <Button name="bad" function={handleBadButton}/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App