import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateLikes } from './requests'
import NotificationContext from './NotificationContext'
import { notificationReducer } from './NotificationContext'

const App = () => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')

  const queryClient = new useQueryClient()
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
  })

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      messageDispatch({
        type: 'ADD',
        payload: `Anecdote ${newAnecdote.content} created`,
      })
      setTimeout(() => messageDispatch({ type: 'REMOVE' }), 5000)
    },
    onError: () => {
      messageDispatch({
        type: 'ERROR',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(() => messageDispatch({ type: 'REMOVE' }), 5000)
    },
  })

  const updateAnecdoteMutation = useMutation(updateLikes, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      messageDispatch({
        type: 'ADD',
        payload: `You voted '${anecdote.content}'`,
      })
      setTimeout(() => messageDispatch({ type: 'REMOVE' }), 5000)
    },
  })

  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <h3>Anecdote Service not available due to problems in server</h3>
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm addAnecdote={addAnecdote} />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
