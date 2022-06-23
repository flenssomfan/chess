import React, { useEffect, useState } from 'react';
import "./App.css";
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Figure } from './models/figures/Figure';
import { Player } from './models/Player';
import Timer from "./components/Timer";



const App = () => {
const [board, setBoard] = useState(new Board())
const [whitePLayer, setWhitePLayer] = useState(new Player(Colors.WHITE))
const [blackPLayer, setBlackPLayer] = useState(new Player(Colors.BLACK))
const [currentPLayer, setCurrentPLayer] = useState<Player | null>(null);

useEffect(() => {
restart()
setCurrentPLayer(whitePLayer);
}, [])


function restart () {
  const newBoard = new Board();
  newBoard.initCells()
  newBoard.addFigures()
  setBoard(newBoard)
}

function swapPLayer(){
  setCurrentPLayer(currentPLayer?.color === Colors.WHITE ? blackPLayer : whitePLayer)
}
  return (
    <div className="app">
      <Timer
      restart={restart}
      currentPlayer={currentPLayer}
      />
<BoardComponent
board={board}
setBoard={setBoard}
currentPlayer={currentPLayer}
swapPlayer={swapPLayer}
/>
<div>
  <LostFigures 
  title="Черные фигуры"
  figures={board.lostBlackFigures}  
  />
   <LostFigures 
  title="Белые фигуры"
  figures={board.lostWhiteFigures}  
  />
</div>
    </div>
  );
};

export default App;
