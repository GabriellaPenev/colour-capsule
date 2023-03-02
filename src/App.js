import './App.css';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import firebase from './firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import Header from './Header';
import Form from './Form';
import Results from './Results';
import Canvas from './Canvas';
import Footer from './Footer';

function App() {

  const initialValues = {
    title: '',
    color1: "#ffffff",
    color2: "#ffffff",
    color3: "#ffffff",
    color4: "#ffffff",
    color5: "#ffffff"
  };
  // state to bring data stored in firebase to the page: 
  const [colors, setColors] = useState([]);

  // state to store user's input data and push them to firebase:
  const [userInput, setUserInput] = useState(initialValues);

  const handleInputChange = (e) => {
    console.log(e.target)
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
        dbColors.push({ name: data[key], key: key });
      }
      // update the component's state using the local array dbColors
      setColors(dbColors);
      // console.log(dbColors)
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const database = getDatabase(firebase)
    const dbRef = ref(database)
    
    let white = 0;
    let black = 0;
    for (let value in userInput){
      if (userInput[value] === '#ffffff'){
      white += 1
      } else if (userInput[value] === '#000000'){
        black += 1
      }
    }
    
    
    if (userInput.title === '') {
      // pls add a title to your capsule:
      toast('❗Please add a title to create your colour capsule!')
      // alert('please add a capsule name!')
    } else if (white > 1){
      toast('🚫 You have selected white as more than one of your capsule colours!') 
    }  else if (black > 1){
      toast('🚫 You have selected black as more than one of your capsule colours!') 
    } else {
      
      // add data to firebase, pass in where (dbRef) and what is going (userInput):
      push(dbRef, userInput);
      // clear the inputs after it loads to firebase and page:
      setUserInput(initialValues);
    }
  }

  const handleRemoveCapsule = (capsuleID) => {
    // dbRef points to the specific node of the capsule I want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${capsuleID}`);
    // remove the node specific to the capsule id
    remove(dbRef)
  }

  return (
    <div className="app wrapper">
      <Header />
      <main>

        <Form
          userInput={userInput}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        <Results
          colors={colors}
          handleRemoveCapsule={handleRemoveCapsule}
        />

        <Canvas
          colors={colors}
        />
      </main>
      <ToastContainer
      newestOnTop={false}
      pauseOnFocusLoss
      />
      <Footer />
    </div>
  );
}

export default App;
