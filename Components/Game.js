import React, { useState } from "react";
import Board from "./Board/Board";

export default function Game() {
  const [height, setHeight] = useState(8)
  const [width, setWidth] = useState(8)
  const [mines, setMines] = useState(15)


  function checkMines(array){
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if (array[x][y].value !== '💣')  {
          if (x - 1 >= 0 && array[x - 1][y].value === '💣') {
            array[x][y].value++
          }
          if (y - 1 >= 0 && array[x][y - 1].value === '💣') {
            array[x][y].value++
          }
          if (x - 1 >= 0 && y - 1 >= 0 && array[x - 1][y - 1].value === '💣') {
            array[x][y].value++
          }
          if (x + 1 < width && array[x + 1][y].value === '💣') {
            array[x][y].value++
          }
          if (y + 1 < width && array[x][y + 1].value === '💣') {
            array[x][y].value++
          }
          if (x + 1 < width && y + 1 < width && array[x + 1][y + 1].value === '💣') {
            array[x][y].value++
          }
          if (x + 1 < width && y - 1 >= 0 && array[x + 1][y - 1].value === '💣') {
            array[x][y].value++
          }
          if (x - 1 >= 0 && y + 1 < width && array[x - 1][y + 1].value === '💣') {
            array[x][y].value++
          }
        }
      }
    }
  }



  return (
    <div>
      <Board
        height={height}
        width={width}
        checkMines={checkMines}
        mines={mines}
      />
    </div>

  );
}