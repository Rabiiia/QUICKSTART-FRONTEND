import React from 'react'
import { useState, useEffect } from 'react'

const Jokes = () => {
    const [jokes, setJokes] = useState([])

    const fetchJokeData = () => {
      fetch("http://localhost:8080/api/info/externalAPI/jokes")
        .then(response => {
          return response.json()
        })
        .then(data => {
            setJokes(data)
        })
    }
  
    useEffect(() => {
        fetchJokeData()
    }, [])
  
    return (
      <div>
        {jokes.length > 0 && (
          <ul>
            {jokes.map((joke, index) => (
              <div key={index}>
                <h3>{joke.value}</h3>
                <h3>{joke.created_at}</h3>
                <h3>{joke.joke}</h3>
                <h3>{joke.status}</h3>
              </div>
            ))}
          </ul>
        )}
      </div>
    );
  }

export default Jokes