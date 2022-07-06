import React, { useState, useEffect } from "react";
import "./Board.css"
import Cell from "../Cell/Cell";
import { useEffect } from "react/cjs/react.production.min";

export default function Board({ height, width, mines, checkMines }) {
  const [board, setBoard] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [total, setTotal] = useState(0)
  const [winState, setWinState] = useState(false)

  function createBoard() {
    setDisabled(false)
    let gameBoard = []
    let minesPlanted = 0
    let index = 0
    for (let x = 0; x < height; x++) {
      gameBoard.push([])
      for (let y = 0; y < width; y++) {
        gameBoard[x][y] = { index: index, value: 0, isRevealed: false }
        index++
      }
    }
    while (minesPlanted < mines) {
      let randomX = Math.floor(Math.random() * width)
      let randomY = Math.floor(Math.random() * width)
      if (gameBoard[randomX][randomY].value !== "💣") {
        gameBoard[randomX][randomY].value = "💣"
        minesPlanted++
      }
    }
    setTotal(index)
    checkMines(gameBoard)
    setBoard(gameBoard)
  }

  function clickReveal(index) {
    let tempBoard = [...board]
    let tempTotal = total
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if (tempBoard[x][y].index === index) {
          tempBoard[x][y].isRevealed = true
          tempTotal--
        }
      }
    }
    setBoard(tempBoard)
    setTotal(tempTotal)
  }

  function revealMines(){
    let tempBoard = [...board]
    setDisabled(true)
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if ((tempBoard[x][y].value === "💣") && (tempBoard[x][y].isRevealed === false)) {
          tempBoard[x][y].isRevealed = true
        }
      }
    }
    setBoard(tempBoard)
  }

  useEffect(() => {
    let tempBoard = [...board]
    if (tempBoard.length > 0) {
      for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
          if ((tempBoard[x][y].value === "💣") && (tempBoard[x][y].isRevealed === true)) {
            return revealMines()
          }
        }
      }
    }
    if(total === mines){
      setWinState(true)
      setDisabled(true)
    }
  }, [board])

  function winner(){
    if(winState){
      return <div className="winner">Congratulations, you won</div>
    }
  }

  return (
    <div>
      <button onClick={createBoard}>New Game</button>
      <div className="grid">
        {board.map(row => (
          row.map(cell => (
            <Cell
              key={cell.index}
              cell={cell}
              clickReveal={clickReveal}
              disabled={disabled}
            />
          ))
        ))}
      </div>
      {winner()}
    </div>
  );
}
