import { useState, useRef } from 'react';
import { getDatabase, ref, remove } from 'firebase/database';
import firebase from './firebase';

import Header from './Header';
import Form from './Form';
import Results from './Results';
import Canvas from './Canvas';
import Footer from './Footer';
import './App.css';

function App() {

  const resultRef = useRef(null);

  // state to bring data stored in firebase to the page: 
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#000')

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
          setColors={setColors}
          resultRef={resultRef}
        />

        <Results
          colors={colors}
          setSelectedColor={setSelectedColor}
          handleRemoveCapsule={handleRemoveCapsule}
          />

        <Canvas
          ref={resultRef}
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
