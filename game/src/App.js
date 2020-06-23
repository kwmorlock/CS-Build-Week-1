import React, {useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
import HomeScreen from "./components/homescreen";

const numberRows = 100;
const numberColumns = 100;

function App() {
  const [board, setBoard] = useState(() => {
    const rows = [];
    for (let i = 0; i < numberRows; i++){ //rows for the grid
    rows.push(Array.from(Array(numberColumns), () => 0)) //pushing a column which is an array, by default everything will be dead which is why 0, and if 1 that means its alive
    }
  })
  return (
    <div className="App">
 <HomeScreen />
    </div>
  );
}

export default App;
