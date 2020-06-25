import React, {useState, useCallback, useRef} from 'react';
// import logo from './logo.svg';
// import './App.css';
// import HomeScreen from "./components/homescreen";
import produce from 'immer'; //so we can use produce for immutable change to create a new grid
import '../src/components/homescreen.css';
import {surprise} from "./patterns/surprise";
import {extra} from "./patterns/extra";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';



const numberRows = 75;
const numberColumns = 75;

const speeds = {
  slow: 700,
  normal: 350,
  fast: 50
}

const patterns = {
  surprise: surprise,
  extra: extra
}


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

  console.log(board)

  const [speed, setSpeed] = useState("normal")

  const speedRef = useRef(speed)
  speedRef.current = speed;

  const [generations, setGenerations] = useState(0); //for generations
  const generationsRef = useRef(generations); //using useRef hook to current generation value
  generationsRef.current = generations

  const [playgod, setPlayGod] = useState(false);

  const playgodRef = useRef(playgod); //keeps current value in a callback
  playgodRef.current = playgod

  const runSimulation = useCallback(() => { //empty array so function is only created once
//useCallback is imported from react
//simulate
if(!playgodRef.current){
  return;
}

setGenerations((count) =>{ //mapping through the count, and for every generation made we will add plus 1, count is just a counter
  return (count = count +1)
})

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
setTimeout(runSimulation, speeds[speedRef.current]);
  }, [])
  // console.log(board)


const handleSpeed = e => {
  setSpeed(e.target.value)
}

const patternChange = e => { //creating change handler for target value, if name of value is none, have it geenrate an empty board, else ifits not none we change the value to our pattern
  let name = e.target.value
  if(name === "None") {
    setBoard(generateEmptyBoard())
  }
  else {
    setBoard(patterns[name])
  }
}

const [open, setOpen] = React.useState(false)

  return (
    <>
    <h1>Generations: {generations}</h1>

    <div class="btn">

    <button className="button" onClick={() => setOpen(true)}>
Rules/About      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
      <div class="modal">
      <h1>Rules</h1>
      <h1>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</h1>
<h1>Any live cell with two or three live neighbours lives on to the next generation.</h1>
<h1>Any live cell with more than three live neighbours dies, as if by overpopulation.</h1>
<h1>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</h1>
<h1>About Conway's Game of Life</h1>
<h1>This game is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</h1>
<h1>This game has no players, and evolves from a starting state.</h1>
<h1>This game is turing complete meaning it can simulate a turing machine. </h1>
<h1>A turing machine is a mathemcatical model of computation</h1>
<h1>that defines an abstract machine created by Alan Turing.</h1>
    </div>
      </Modal>
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
    HADES
  </button>

  <button onClick={() => {
 const rows = [];
 for (let i = 0; i < numberRows; i++){ //rows for the grid
 rows.push(Array.from(Array(numberColumns), () => Math.random() >.5 ? 1 : 0)) //pushing a column which is an array, by default everything will be dead which is why 0, and if 1 that means its alive
 }
 setBoard(rows);
  }}>
    PROMETHEUS
  </button>

  <button onClick ={() =>{ //generations are increasing quicker
    setTimeout(runSimulation(), 1)
  }}> HERMES

  </button>

  <span>
    <label> pattern: </label>
      <select name = "patterns" id = "patterns" onChange ={patternChange} >
        <option value="None">none </option>
        <option value="surprise">surprise</option>
        <option value="extra">extra</option>
      </select>
   
  </span>

  <span>
    <label> Speed: </label>
      <select onChange ={handleSpeed} >
        <option value="normal">Normal </option>
        <option value="fast">fast</option>
        <option value="slow">slow</option>
      </select>
   
  </span>

  {/* <button onClick ={() =>{ 
  
    
  }}> BOARD TEST

  </button> */}

  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
    <button>TRY THIS</button>
</a>


</div>


    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numberColumns}, 20px`
    }}>
      {board.map((rows, r) =>
         rows.map((columns, c) => (
         <div
         key={`${r}-${c}`} //needs key for array, its ok to use the index as a key, because we arent going to shift the divs
          onClick={() => {
            if(!playgod){
              const newBoard = produce(board, boardcopy => { //boardcopy we can alter in anyway we want
                boardcopy[r][c] = board[r][c] ? 0 : 1; //this allows a toggle, so if alive can make dead
              })
              setBoard(newBoard)
            }
      
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
    {/* <div>
      <h1>Rules</h1>
      <h1>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</h1>
<h1>Any live cell with two or three live neighbours lives on to the next generation.</h1>
<h1>Any live cell with more than three live neighbours dies, as if by overpopulation.</h1>
<h1>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</h1>
<h1>About Conway's Game of Life</h1>
<h1>This game is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</h1>
<h1>This game has no players, and evolves from a starting state.</h1>
<h1>This game is turing complete meaning it can simulate a turing machine. </h1>
<h1>A turing machine is a mathemcatical model of computation</h1>
<h1>that defines an abstract machine created by Alan Turing.</h1>
    </div> */}

 

    
    </>
  );
}

export default App;
