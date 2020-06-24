import React, {useState, useCallback, useRef} from 'react';
// import logo from './logo.svg';
// import './App.css';
import HomeScreen from "./components/homescreen";
import produce from 'immer'; //

const numberRows = 75;
const numberColumns = 75;

function App() {
  const [board, setBoard] = useState(() => {
    const rows = [];
    for (let i = 0; i < numberRows; i++){ //rows for the grid
    rows.push(Array.from(Array(numberColumns), () => 0)) //pushing a column which is an array, by default everything will be dead which is why 0, and if 1 that means its alive
    }
    return rows;
  })

  const [playgod, setPlayGod] = useState(false);

  const playgodRef = useRef(playgod); //keeps current value in a callback
  playgodRef.current = playgod

  const runSimulation = useCallback(() => { //empty array so function is only created once
//useCallback is imported from react
//simulate
if(!playgod.current){
  return;
}
setTimeout(runSimulation, 1000);
  }, [])
  // console.log(board)
  return (
    <>
    <button
    onClick={() => { //onclick added to toggle button between two button settings
      setPlayGod(!playgod);
    }}
    >{playgod ? 'STOP PLAYING GOD' : 'PLAY GOD'} </button>
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numberColumns}, 20px`
    }}>
      {board.map((rows, r) =>
         rows.map((columns, c) => (
         <div
         key={`${r}-${c}`} //needs key for array, its ok to use the index as a key, because we arent going to shift the divs
          onClick={() => {
            const newBoard = produce(board, boardcopy => { //boardcopy we can alter in anyway we want
              boardcopy[r][c] = board[r][c] ? 0 : 1; //this allows a toggle, so if alive can make dead
            })
          setBoard(newBoard)
          }}
         style={{
            width:20,
            height: 20,
            backgroundColor: board[r][c] ? 'purple' : undefined,
            border: "solid 1px black"
          }}
          />))
      )}
 {/* <HomeScreen /> */}
    </div>
    </>
  );
}

export default App;
