import { useEffect, useState } from "react";
import "../styles/Board.css";

export default function Board() {
  const [boards, setBoards] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  // checking for a winner 
  useEffect(() => {
    const checkForAWinner = (player) => {
        if((boards[0] === player && boards[1] === player && boards[2] === player) ||
        (boards[3] === player && boards[4] === player && boards[5] === player) ||
        (boards[6] === player && boards[7] === player && boards[8] === player) || 
        (boards[0] === player && boards[3] === player && boards[6] === player) || 
        (boards[1] === player && boards[4] === player && boards[7] === player) || 
        (boards[2] === player && boards[5] === player && boards[8] === player) ||
        (boards[0] === player && boards[4] === player && boards[8] === player) ||
        (boards[2] === player && boards[4] === player && boards[6] === player)) {
            return true;
        } else {
            return false;
        }
    }

    if(checkForAWinner("X")) {
        setWinner("X");
    } else if(checkForAWinner("O")){
        setWinner("O");
    }
  }, [boards]);

  useEffect(() => {
    const checkForTieGame = () => {
        for(let i = 0; i < boards.length; i++) {
            if(boards[i] === null) {
                return false;
            }
         }
         return true;
    } 

    if(!winner && checkForTieGame()) {
        setIsTie(prev => !prev);
    }
  }, [winner, boards]);

  const handleClick = (index) => {
    // if the box is already filled we will just skip,
    // or if one of the player has already won we will end the game
    if (winner || boards[index]) return;

    // it's like when the player makes his first step (1st turn)
    // react deletes the render of the 1 turn and creates the new render for the next step (turn) and fills the new box within the old box
    const newBoard = [...boards];
    newBoard[index] = playerTurn;
    setBoards(newBoard);
    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  };

  // restarting the game   
  const handleRestartBtn = () => {
    setBoards(Array(9).fill(null));
    setPlayerTurn("X");
    setWinner(null);
    setIsTie(false);
  }

  return (
    <div className="board-container">
      <p className="turn-text">{winner ? `${winner} won the game` : isTie ? "Tie game" : `${playerTurn}'s `}</p>
      <div className="board">
        {boards.map((value, index) => (
          <div className="box" key={index} onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      <button onClick={handleRestartBtn} className="restart">Restart</button>
    </div>
  );
}
