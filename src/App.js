import { useState } from 'react';
import './css/App.css'

const App = () => {

  const [theyString, setTheyString] = useState("Hope you are having a good day")
  const [youString, setYouString] = useState("")
  
  //keep the input value and youString in sync
  const changeInputHandler = (event) => {
    setYouString(event.target.value)
  }
  
  const sumbitHandler = (event) => {
    //prevent page reloading
    event.preventDefault()
    
    //set theyString to youString
    setTheyString(youString)

    //set youString to nothing
    setYouString("")
    
    //close window?
  }

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
