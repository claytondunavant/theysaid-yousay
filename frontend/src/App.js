import { useEffect, useState } from 'react';
import quoteService from './services/quotes'
import './css/App.css'

const App = () => {

  const [theyQuote, setTheyQuote] = useState({})
  const [youQuoteContent, setYouQuoteContent] = useState('')
  
  //EFFECTS
  
  const getLatestTheyQuote = () => {
    quoteService
      .getLatest()
      .then(latestQuote => {
        setTheyQuote(latestQuote)
      })
  }
  
  //only runs once when page is loaded?
  useEffect(getLatestTheyQuote, [])
  
  //FUNCTIONS
  
  //keep the input value and youString in sync
  const changeInputHandler = (event) => {
    setYouQuoteContent(event.target.value)
  }
  
  const sumbitHandler = (event) => {
    //prevent page reloading
    event.preventDefault()
    
    const youQuote = {
      content: youQuoteContent
    }

    //send new quote to backend
    //set returned quote to theyQuote
    //reset youQuoteContent
    quoteService
      .create(youQuote)
      .then(returnedNote => {
        setTheyQuote(returnedNote)
        setYouQuoteContent('')
      })
    
    //close window?
  }

  return (
    <div className="center">

      <h1>They Said:</h1>
      <h2>"{theyQuote.content}"</h2>
      <h3 className="quote">- them</h3>
    
      <hr />

      <h1>You Say:</h1>

      <form onSubmit={sumbitHandler}>
        <input
          value={youQuoteContent}
          onChange={changeInputHandler}
        >
        </input>
        <button type="submit">tell them</button>
      </form>

    </div>
  )
}

export default App;
