import { useState } from 'react';
import Header from './Header';
import Form from './Form';
import Results from './Results';
import Canvas from './Canvas';
import Footer from './Footer';
import './App.css';

function App() {

  // state to bring data stored in firebase to the page: 
  const [colors, setColors] = useState([]);

  const [selectedColor, setSelectedColor] = useState('#000')

  return (
    <div className="app wrapper">
      <Header />
      <main>

        <Form
          setColors={setColors}
        />

        <Results
          colors={colors}
          setSelectedColor={setSelectedColor}
        />

        <Canvas
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
