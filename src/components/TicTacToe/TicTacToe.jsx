import React, { useEffect, useState } from "react";
// import { SiEsotericsoftware } from "react-icons/si"; // Not used in the current version, can be removed if not needed

/**
 * Square component represents a single cell in the Tic Tac Toe board.
 * It displays 'X', 'O', or is empty, and responds to clicks.
 *
 * @param {object} props - Component props.
 * @param {string} props.value - The current value of the square ('X', 'O', or '').
 * @param {function} props.onClick - Function to call when the square is clicked.
 */
function Square({ value, onClick }) {
  // Determine text color based on player ('X' is blue, 'O' is pink)
  const textColor = value === 'X' ? 'text-blue-400' : 'text-pink-400';

  return (
      // Button for each square with responsive sizing, border, and dynamic text color
      <button
          onClick={onClick}
          // Tailwind classes for styling:
          // aspect-square makes it a perfect square
          // Responsive width for different screen sizes (w-24 to w-40)
          // Background and border styles
          // Text styling (color, size, weight)
          // Transition for smooth hover effects
          className={`
        aspect-square w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 
        bg-gray-800 border-2 border-gray-700 
        ${textColor} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold 
        flex items-center justify-center 
        transition-all duration-200 ease-in-out 
        hover:scale-105 hover:bg-gray-700 active:scale-95 focus:outline-none 
        ${value ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
          disabled={!!value} // Disable button if it already has a value ('X' or 'O')
      >
        {value}
      </button>
  );
}

/**
 * TicTacToe component implements the classic game of Tic Tac Toe.
 * It manages game state, checks for winners, and handles user interactions.
 */
const TicTacToe = () => {
  // State for the 9 squares on the board, initialized as empty
  const [squares, setSquares] = useState(Array(9).fill(""));
  // State to track whose turn it is (true for 'X', false for 'O')
  const [isXTurn, setIsXTurn] = useState(true);
  // State to store the current game status (Next player, Winner, or Draw)
  const [status, setStatus] = useState("");

  /**
   * Resets the game board and turn to initial state.
   */
  function handleRestart() {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
    setStatus(""); // Clear status message on restart
  }

  /**
   * Handles a click on one of the game squares.
   * Updates the square's value, switches turn, and re-evaluates game status.
   *
   * @param {number} getCurrentSquare - The index of the clicked square (0-8).
   */
  function handleClick(getCurrentSquare) {
    let cpySquares = [...squares]; // Create a mutable copy of the squares array

    // If there's already a winner or the square is already filled, do nothing
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) {
      return;
    }

    // Set the square's value to 'X' or 'O' based on current turn
    cpySquares[getCurrentSquare] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn); // Toggle turn
    setSquares(cpySquares); // Update the board state
  }

  /**
   * Checks for a winner based on the current state of the squares.
   *
   * @param {Array<string>} squares - The array representing the game board.
   * @returns {string|null} - 'X' if X wins, 'O' if O wins, or null if no winner yet.
   */
  function getWinner(squares) {
    // All possible winning combinations (rows, columns, diagonals)
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    // Iterate through winning patterns to check for a match
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i]; // Destructure current pattern

      // Check if squares at positions a, b, c have the same non-empty value
      if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
      ) {
        return squares[a]; // Return the winning player ('X' or 'O')
      }
    }
    return null; // No winner found
  }

  // useEffect hook to update the game status message
  useEffect(() => {
    // Check if there's a winner
    const winner = getWinner(squares);
    if (winner) {
      setStatus(`🎉 Winner is ${winner}! Please Restart.`);
    }
    // Check for a draw (no winner AND all squares are filled)
    else if (!winner && squares.every((item) => item !== "")) {
      setStatus(`🤝 It's a Draw! Please Restart.`);
    }
    // If no winner and not a draw, display next player's turn
    else {
      setStatus(`Next Player: ${isXTurn ? "X (Blue)" : "O (Pink)"}`);
    }
  }, [squares, isXTurn]); // Dependencies: Re-run when squares or isXTurn changes

  return (
      // Main container for the Tic Tac Toe game.
      // Uses a full viewport height, a gradient background, and centers content.
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-gray-900 via-zinc-900 to-black text-white overflow-hidden">

        {/* Game Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10 text-center
                     text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400
                     drop-shadow-lg animate-fade-in-down">
          Tic Tac Toe
        </h1>

        {/* Game Board Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 border-4 border-gray-700 rounded-lg shadow-2xl animate-pop-in">
          {/* Render each square using map for better maintainability */}
          {squares.map((value, index) => (
              <Square key={index} value={value} onClick={() => handleClick(index)} />
          ))}
        </div>

        {/* Game Status and Restart Button */}
        <div className="flex flex-col items-center mt-8 space-y-6 w-full max-w-sm sm:max-w-md animate-fade-in-up">
          {/* Status Message */}
          <h2 className={`
          text-xl sm:text-2xl md:text-3xl font-semibold text-center py-2 px-4 rounded-lg 
          ${status.includes('Winner') ? 'bg-green-700 text-green-200' :
              status.includes('Draw') ? 'bg-yellow-700 text-yellow-200' :
                  'bg-gray-700 text-gray-300'}
          transition-colors duration-300
          animate-status-pulse
        `}>
            {status}
          </h2>

          {/* Restart Button */}
          <button
              onClick={handleRestart}
              className="px-8 py-3 rounded-full text-lg sm:text-xl font-bold
                     bg-gradient-to-r from-blue-500 to-purple-600 text-white
                     shadow-lg transition-all duration-300 transform
                     hover:scale-105 hover:shadow-xl active:scale-95
                     focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            Restart Game
          </button>
        </div>

        {/* Custom CSS for animations (can be moved to a global stylesheet) */}
        <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes statusPulse {
            0% { transform: scale(1); box-shadow: 0 0 0px rgba(0,0,0,0.5); }
            50% { transform: scale(1.02); box-shadow: 0 0 10px rgba(255,255,255,0.3); }
            100% { transform: scale(1); box-shadow: 0 0 0px rgba(0,0,0,0.5); }
        }

        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
        .animate-status-pulse { animation: statusPulse 1.5s infinite ease-in-out; }
      `}</style>
      </div>
  );
};

export default TicTacToe;