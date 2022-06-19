import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import { Cell } from '../models/Cell';
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
  const [selectedCell, setselectedCell] = useState<Cell | null>(null);

function click(cell: Cell){
   if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
   setselectedCell(null); 
  } else {
    setselectedCell(cell);
  }
}
useEffect(()=>{
  highlightCells()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedCell])
function highlightCells(){
  board.highlightCells(selectedCell)
  updateBoard()
}

function updateBoard() {
const newBoard = board.getCopyBoard()
setBoard(newBoard)
}
return (
 <div className="board">
 {board.cells.map((row, index) =>
   <React.Fragment key={index}>
     {row.map(cell =>
    <CellComponent
    click={click}
    cell={cell}
    key={cell.id}
    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
    />
    )} 
   </React.Fragment>)}
 </div> 
)
}
export default BoardComponent;