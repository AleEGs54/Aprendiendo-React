import { Children, useState } from 'react'
import './App.css'
import confetti from "canvas-confetti";

const TURNS = {
  X: "X",
  O: "O"
}


const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]


function App() {

  //Este conjunto de estados y funciones se aplica a cada ellemento Square (a los 9 individualmente) y por ende cada uno puede activarlo individualmente
  const [board, setBoard] = useState(Array(9).fill(null));

  //null es que no hay ganador, false es empate, (X u O es winner pero so agregados por omision )
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
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

  const [turn, setTurn] = useState(TURNS.X);

  const resetGame = () => {
    //Resetar todos los estados (3 en este caso) - no actualizar la pagina
    setBoard(Array(9).fill(null)),
    setTurn(TURNS.X),
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    //Chequear todos los elementos del nuevo tablero y verificar si todos tienen un valor diferente a null
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //si el Square ya tiene un valor, retorna nada, no se puede cambiar
    if (board[index] || winner ) return;

      //Actualizar el tablero
    const newBoard = [...board] // En lugar de cambiar el prop, se hace una copia y se usa para no mutar el prop original.
    newBoard[index] = turn;
    setBoard(newBoard);
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    //Revisar si hay un ganador en cada turno.
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti();
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

  }



  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O} >{TURNS.O}</Square>
      </section>

        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false 
                    ? "Empate"
                    : "Ganó:"
                  }
                </h2>

                <header className='win'>
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }

    </main>
  )
}

export default App
