import React, { useEffect, useState } from "react";
import { SiEsotericsoftware } from "react-icons/si";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXtrun, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");
  function Square({ value, onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-black h-40 w-40 border border-red-400 text-white text-7xl"
      >
        {value}
      </button>
    );
  }
  function handleRestart() {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  }
  function handelClick(getCurrentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    cpySquares[getCurrentSquare] = isXtrun ? "X" : "O";
    setIsXTurn(!isXtrun);
    setSquares(cpySquares);
  }
  function getWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  }
  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setStatus(`This is a Draw ! Please Restart Game`);
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}. Please Restart The Game`);
    } else {
      setStatus(`Next Player is ${isXtrun ? "X" : "O"}`);
    }
  }, [squares, isXtrun]);

  return (
    <div className="h-screen bg-pink-700 ">
      <h1 className="text-white text-5xl text-center p-10">Tic Tac Toe Game</h1>
      <div>
        <div className="flex justify-center">
          <Square value={squares[0]} onClick={() => handelClick(0)} />
          <Square value={squares[1]} onClick={() => handelClick(1)} />
          <Square value={squares[2]} onClick={() => handelClick(2)} />
        </div>
        <div className="flex justify-center">
          <Square value={squares[3]} onClick={() => handelClick(3)} />
          <Square value={squares[4]} onClick={() => handelClick(4)} />
          <Square value={squares[5]} onClick={() => handelClick(5)} />
        </div>
        <div className="flex justify-center">
          <Square value={squares[6]} onClick={() => handelClick(6)} />
          <Square value={squares[7]} onClick={() => handelClick(7)} />
          <Square value={squares[8]} onClick={() => handelClick(8)} />
        </div>
      </div>
      <div className="flex flex-col items-center p-10">
        <h1 className="text-3xl font-semibold ">{status}</h1>
        <button
          onClick={handleRestart}
          className="bg-black text-white px-5 py-2 text-3xl w-56 rounded-3xl "
        >
          Restart
        </button>
        <div />
      </div>
    </div>
  );
};

export default TicTacToe;
