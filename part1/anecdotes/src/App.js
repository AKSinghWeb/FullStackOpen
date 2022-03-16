import { useState } from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.heading}</h1>
    </>
  );
};

const Display = ({ anecdotes, votes }) => {
  return (
    <p>
      {anecdotes}
      {`  has Votes ${votes}`}
    </p>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

function randomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const maxVotesIndex = votes.indexOf(Math.max(...votes));
  const votesLoader = () => {
    const votesCpy = [...votes];
    votesCpy[selected] += 1;
    return setVotes(votesCpy);
  };

  const loadAnecdote = () => setSelected(randomInt(0, anecdotes.length - 1));
  return (
    <div>
      <Header heading="Anectode of the day" />
      <Display anecdotes={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={votesLoader} text="Vote" />
      <Button handleClick={loadAnecdote} text="Next Anecdote" />
      <Header heading="Anectode with most votes" />
      <Display
        anecdotes={anecdotes[maxVotesIndex]}
        votes={votes[maxVotesIndex]}
      />
    </div>
  );
};

export default App;
