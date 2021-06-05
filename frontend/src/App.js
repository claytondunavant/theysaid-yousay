import { useState } from 'react';
import quoteService from './services/quotes'
import './css/App.css'

const App = () => {

  const [theyString, setTheyString] = useState("")
  const [youString, setYouString] = useState("")
  
  //keep the input value and youString in sync
  const changeInputHandler = (event) => {
    setYouString(event.target.value)
  }
  
  const sumbitHandler = (event) => {
    //prevent page reloading
    event.preventDefault()
    
    //create newQuote to send
    //date isnt necessary because it will be written by backend
    const quoteObject = {
      content: youString
    }

    //send new quote
    quoteService
      .create(quoteObject)

    //set youString to nothing
    setYouString("")
    
    //close window?
  }
  
  quoteService
    .getLatest()
    .then(latestQuote => {
      setTheyString(latestQuote.content)
    })

  return (
    <div className="center">

      <h1>They Said:</h1>
      <h2>"{theyString}"</h2>
      <h3 className="quote">- them</h3>
    
      <hr />

      <h1>You Say:</h1>

      <form onSubmit={sumbitHandler}>
        <input
          value={youString}
          onChange={changeInputHandler}
        >
        </input>
        <button type="submit">tell them</button>
      </form>

    </div>
  )
}

export default App;
