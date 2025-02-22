import {WINNER_COMBOS} from "../constants.js"

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {

      const [a,b,c] = combo;

      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }

      
    }

    return null;

  }

  export const checkEndGame = (newBoard) => {
    //Chequear todos los elementos del nuevo tablero y verificar si todos tienen un valor diferente a null
    return newBoard.every((square) => square !== null)
  }