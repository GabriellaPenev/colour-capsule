import { useState, useRef } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Results from './Components/Results';
import Canvas from './Components/Canvas';
import Footer from './Components/Footer';
import './App.css';

function App() {

  const resultRef = useRef(null);

  // state to bring data stored in firebase to the page: 
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#000')

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
