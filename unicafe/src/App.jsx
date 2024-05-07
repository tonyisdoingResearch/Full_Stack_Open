import React, { useState } from 'react';

//----------------------------------- Header -----------------------------------//
const Header = () => <h1>Feedback App</h1>;

// ---------------------------------- Header2 -----------------------------------//

const Header2 = () => <h1>Statistics</h1>;

//--------------------------- StatisticLine component ---------------------------//
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}



// ---------------------------- Statistics component ---------------------------//
const Statistics = ({ good, neutral, bad }) => {
// -------------------------- Calculate total and average ----------------------//  
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0; // Ensure no division by zero
  const positive = ((good / total) * 100 || 0).toFixed(2); // Calculate positive percentage

// -------------------------- Render individual statistics ----------------------//
return (
  <table style={{lineHeight: '1'}}>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average" value={average.toFixed(2)} />
      <StatisticLine text="Positive" value={`${positive}%`} />
    </tbody>
  </table>
);
};


// -------------------------------- Button component------------------------------//
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}





 // -------------------------------------- App ---------------------------------- //

const App = () => {
  
  // -------------------------------- State of feedback  ------------------------- //
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

   // -------------------------------- Feedback counter ------------------------- //
  const handleGoodClick = () => {
    setGood(good + 1);
   // ------------------- Boolean value to check if feedback is given ---------- //
    setFeedbackGiven(true);

  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
   // ------------------- Boolean value to check if feedback is given ---------- //
    setFeedbackGiven(true);

  };

  const handleBadClick = () => {
    setBad(bad + 1);
    // ------------------- Boolean value to check if feedback is given ---------- //
    setFeedbackGiven(true);

  };

  // ------------------------------------- Render ---------------------------- //
  return (
    <div>
    
      {/* ----------------  Title --------------------- */}
      <Header />

      {/* ---------------- buttons -------------------- */}
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />

      <Header2 />

{/* Render Statistics if feedback is given, otherwise show "No feedback given -*/}
{feedbackGiven ? (
        <>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
