import './App.css';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import firebase from './firebase';
import { useState, useEffect } from 'react';
import Header from './Header';
import Form from './Form';
import Results from './Results';
import Footer from './Footer';

function App() {

  const initialValues = {
    color1: "#ffffff",
    color2: "#ffffff",
    color3: "#ffffff",
    color4: "#ffffff",
    color5: "#ffffff"
  };
  // state to bring data stored in firebase to the page: 
  const [color, setColor] = useState([]);

  // state to store user's input data and push them to firebase:
  const [userInput, setUserInput] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  useEffect(() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)

    onValue(dbRef, (response) => {
      const dbColors = [];
      const data = response.val();
      for (let key in data) {
        // inside the loop, we push each color name and colour value to the dbColors array:
        dbColors.push({name: data[key], key:key});
      }
      // call setColor to update the component's state using the local array dbColors
      setColor(dbColors);
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const database = getDatabase(firebase)
    const dbRef = ref(database)

    if (userInput) {
      // add data to firebase, pass in where (dbRef) and what is going (userInput):
      push(dbRef, userInput);
      // clear the inputs after it loads to firebase and page:
      setUserInput(initialValues);
    }
  }

    // this function takes an argument, which is the ID of the book we want to remove
    const handleRemoveCapsule = (capsuleID) => {
      // dbRef points to the specific node of the capsule we want to remove
      const database = getDatabase(firebase);
      const dbRef = ref(database, `/${capsuleID}`);
      // using the Firebase method remove(), we remove the node specific to the capsule ID
      remove(dbRef)
    }

  return (
    <div className="App wrapper">
      <Header />
      <main>
        <Form 
          userInput={userInput} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit}
        />
        <Results color={color} handleRemoveCapsule={handleRemoveCapsule} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
