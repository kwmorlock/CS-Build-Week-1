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
    return rows;
  })

  // console.log(board)
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numberColumns}, 18px`
    }}>
      {board.map((rows, r) =>
         rows.map((columns, c) => (
         <div
         key={`${r}-${c}`} //needs key for array, its ok to use the index as a key, because we arent going to shift the divs
          style={{
            width:20,
            height: 20,
            backgroundColor: board[r][c] ? 'pink' : undefined,
            border: "solid 1px black"
          }}
          />))
      )}
 {/* <HomeScreen /> */}
    </div>
  );
}

export default App;
