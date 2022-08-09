import './App.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from './firebase';
import { useState, useEffect } from 'react';

function App() {

  const [color, setColor] = useState([]);
  useEffect(() => {
    // variable that holds my database details
    const database = getDatabase(firebase)

    // variable that references my database
    const dbRef = ref(database)


    // add event listener to that variable that will fire from the database, call the data 'response':
    onValue(dbRef, (response) => {
      const newState = [];

      // here we store the response from our query to Firebase inside of a variable called data.
      // .val() is a Firebase method that gets us the information we want
      const data = response.val();
      // data is an object, so we iterate through it using a for in loop to access each color's value

      for (let key in data) {
        // inside the loop, we push each color name to an array we already created inside the onValue() function called newState
        newState.push(data[key]);
      }

      // then call setColor to update the component's state using the local array newState
      setColor(newState);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Capsule</h1>
        <p>Create a mood board of custom colors that you can use for your next interior design project, outfit pick, or just represent your mood through color. Select up to five colors and save them to your own color capsule:</p>

        <ul>
          {color.map((color) => {
            return (
              <li>
                <p>{color}</p>
              </li>
            )
          })}
        </ul>

        <div className="form">
          <form action="submit">
            <label htmlFor="color1">Color 1</label>
            <input type="color" id="color1" />

            <label htmlFor="color2">Color 2</label>
            <input type="color" id="color2" />

            <label htmlFor="color3">Color 3</label>
            <input type="color" id="color3" />

            <label htmlFor="color4">Color 4</label>
            <input type="color" id="color4" />

            <label htmlFor="color5">Color 5</label>
            <input type="color" id="color5" />

            <button>Add colors to capsule</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
