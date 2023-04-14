import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificatonReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((item) => item.content.includes(state.filter))
  })

  const vote = (anecdote) => {
    dispatch(updateVotes(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 2))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => a.votes - b.votes)

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
