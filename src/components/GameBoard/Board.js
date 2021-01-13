import React, { useState } from "react";
import Square from "./Square";

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  const createBoard = (n) => {
    const board = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(renderSquare(j + i * n));
      }
      board.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
    return board;
  };

  return <div className = "board">{createBoard(20)}</div>;
};

export default Board;
