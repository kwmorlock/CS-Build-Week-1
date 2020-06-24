import React, {useState, useCallback, useRef} from 'react';
// import logo from './logo.svg';
// import './App.css';
import HomeScreen from "./components/homescreen";
import produce from 'immer'; //

const numberRows = 75;
const numberColumns = 75;

const operations = [ //for all the spaces surrounding a space
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const generateEmptyBoard = () => {
  const rows = [];
    for (let i = 0; i < numberRows; i++){ //rows for the grid
    rows.push(Array.from(Array(numberColumns), () => 0)) //pushing a column which is an array, by default everything will be dead which is why 0, and if 1 that means its alive
    }
    return rows;
  }


function App() {
  const [board, setBoard] = useState(() => {
    return generateEmptyBoard()
  })

  const [playgod, setPlayGod] = useState(false);

  const playgodRef = useRef(playgod); //keeps current value in a callback
  playgodRef.current = playgod

  const runSimulation = useCallback(() => { //empty array so function is only created once
//useCallback is imported from react
//simulate
if(!playgodRef.current){
  return;
}
setBoard((g) => {
  return  produce(g, boardCopy => { //going to go through current board g, every cell in it
    for(let i = 0; i < numberRows; i++) {
      for(let k = 0; k < numberColumns; k++) {
        let friends = 0; //compute the number of neighbors it has
        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newK = k + y;
          if (newI >= 0 && newI < numberRows && newK >= 0 && newK < numberColumns) { //checking to make sure we cant go below or above what we can
            friends += g[newI][newK] //if we have a live cell equal to 1 it will add 1 to the neighbors, lets us know how many neighbors
          }
        })
        if (friends < 2 || friends > 3) { //once we check how many neighbors we apply this condition, and this decides what happens to a cell
          boardCopy[i][k] = 0;
        } else if (g[i][k] === 0 && friends === 3) {
          boardCopy[i][k] = 1;
        }
    }
  }
});
});
setTimeout(runSimulation, 1000);
  }, [])
  // console.log(board)
  return (
    <>
    <button
    onClick={() => { //onclick added to toggle button between two button settings
      setPlayGod(!playgod);
      if (!playgod){

      playgodRef.current = true;
      runSimulation()
      }
    }}
    >{playgod ? 'STOP PLAYING GOD' : 'PLAY GOD'} </button>
  <button onClick={() => {
setBoard(generateEmptyBoard())
  }}>
    DESTROY
  </button>


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
