import React, { useState } from "react";
import "./Cell.css";


export default function Cell({ cell, clickReveal, disabled }) {

  function handleClick(){
    if (!disabled){
      clickReveal(cell.index)
    }
  }
  if (!cell.isRevealed) {
    return <div style={{ backgroundColor: "grey" }} className="cell" onClick={handleClick}></div>
  }
  if (cell.value === '💣') {
    return (
      <div style={{ backgroundColor: "red" }} className="cell">
        <div className="cell-value">{cell.value}</div>
      </div>
    )
  } else {
    return (
      <div style={{ backgroundColor: "lightgrey" }} className="cell">
        <div className="cell-value">{cell.value}</div>
      </div>
    )
  }
}
