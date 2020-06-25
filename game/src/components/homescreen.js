import React from "react";
import './homescreen.css';


const HomeScreen = () => {

  return (
    <>
    <div>
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
    <button></button>

   
    </>
  );
};

export default HomeScreen;