import React, {useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
import HomeScreen from "./components/homescreen";

function App() {
  const [board, setBoard] = useState(() => {
    const rows = [];
  })
  return (
    <div className="App">
 <HomeScreen />
    </div>
  );
}

export default App;
