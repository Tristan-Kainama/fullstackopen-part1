import { useState } from 'react'

const Statistics = (props) => {
  return (
    <>
      <p>{props.name} {props.statistic}</p>
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
    const newPositive = newGood / newAll;
    const positiveString = newPositive + " %";

    setPositive(positiveString);
    console.log(positive);
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
      <button onClick={handleGoodButton}>good</button>
      <button onClick={handleNeutralButton}>neutral</button>
      <button onClick={handleBadButton}>bad</button>

      <h1>statistics</h1>
      <Statistics name="good" statistic={good}/>
      <Statistics name="neutral" statistic={neutral}/>
      <Statistics name="bad" statistic={bad}/>
      <Statistics name="all" statistic={all}/>
      <Statistics name="average" statistic={average}/>
      <Statistics name="positive" statistic={positive} />
    </div>
  )
}

export default App