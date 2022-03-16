import { useState } from "react";

const Header = ({ heading }) => {
  return <h1>{heading}</h1>;
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ values }) => {
  const all = values[0] + values[1] + values[2];

  if (all === 0) {
    return <div>No feedback given.</div>;
  }

  return (
    <table>
      <StatisticsLine text="Good" value={values[0]} />
      <StatisticsLine text="Neutral" value={values[1]} />
      <StatisticsLine text="Bad" value={values[2]} />
      <StatisticsLine text="Average" value={all / 3} />
      <StatisticsLine
        text="Positive"
        value={values[0] === 0 ? 0 : `${(values[0] / all) * 100}%`}
      />
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const values = [good, neutral, bad];

  return (
    <div>
      <Header heading="Give Feedback" />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Header heading="Statistics" />
      <Statistics values={values} />
    </div>
  );
};

export default App;
