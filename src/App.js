import './App.css';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase';
import { useState, useEffect } from 'react';

function App() {

  const initialValues = {
    color1: "#FFFFFF",
    color2: "#FFFFFF",
    color3: "#FFFFFF",
    color4: "#FFFFFF",
    color5: "#FFFFFF"
  };

  const [color, setColor] = useState([]);
  const [userInput, setUserInput] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  useEffect(() => {
    // variable that holds my database details
    const database = getDatabase(firebase)
    // variable that references my database
    const dbRef = ref(database)
    // add event listener to that variable that will fire from the database, call the data 'response':
    onValue(dbRef, (response) => {
      const dbColors = [];
      // here we store the response from our query to Firebase inside of a variable called data.
      // .val() is a Firebase method that gets us the information we want
      const data = response.val();
      // data is an object, so we iterate through it using a for in loop to access each color's value
      for (let hexcode in data) {
        // inside the loop, we push each color name to the dbColors array:
        dbColors.push(data[hexcode]);
      }
      // then call setColor to update the component's state using the local array dbColors
      setColor(dbColors);
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // create a reference to the database:
    const database = getDatabase(firebase)
    const dbRef = ref(database)

    if (userInput) {

      // add data to firebase, pass in where (dbRef) and what is going (userInput):
      push(dbRef, JSON.stringify( userInput));
      // clear the inputs after it loads to firebase and page:
      setUserInput('');
    }
  }

  return (
    <div className="App wrapper">
      <header className="App-header">
        <h1>Color Capsule</h1>
        <p>Create a mood board of custom colors that you can use for your next interior design project, outfit pick, or just represent your mood through color. Select up to five colors and save them to your own color capsule:</p>

        <div className="form">
          <form action="submit">
            <div className="options">
              <div className="option">
                <label htmlFor="color1">Color 1</label>
                <input
                  type="color"
                  id="color1"
                  value={userInput.color1}
                  onChange={handleInputChange}
                  name="color1"
                  label="color1"
                />
              </div>

              <div className="option">
                <label htmlFor="color2">Color 2</label>
                <input
                  type="color"
                  id="color2"
                  value={userInput.color2}
                  onChange={handleInputChange}
                  name="color2"
                  label="color2"
                />
              </div>
              <div className="option">
                <label htmlFor="color3">Color 3</label>
                <input
                  type="color"
                  id="color3"
                  value={userInput.color3}
                  onChange={handleInputChange}
                  name="color3"
                  label="color3"
                />
              </div>
              <div className="option">
                <label htmlFor="color4">Color 4</label>
                <input
                  type="color"
                  id="color4"
                  value={userInput.color4}
                  onChange={handleInputChange}
                  name="color4"
                  label="color4"
                />
              </div>
              <div className="option">
                <label htmlFor="color5">Color 5</label>
                <input
                  type="color"
                  id="color5"
                  value={userInput.color5}
                  onChange={handleInputChange}
                  name="color5"
                  label="color5"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
            >Create color capsule</button>
          </form>
        </div>
      </header>

      <ul>
        {color.map((color) => {
          return (
            <li key={color}>
              <div className="results" style={{ "backgroundColor": color }} ></div>
              <p>{color}</p>
            </li>
          )
        })}
      </ul>


    </div>
  );
}

export default App;
