import { Children, useState } from 'react'
import './App.css'
import confetti from "canvas-confetti";

import {Square} from './components/Square.jsx'
import {TURNS} from "./constants.js"
import {checkWinner, checkEndGame} from "./logic/board.js"
import { WinnerModal } from './components/WinnerModal.jsx';



function App() {

  //Este conjunto de estados y funciones se aplica a cada ellemento Square (a los 9 individualmente) y por ende cada uno puede activarlo individualmente
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board")
    return boardFromStorage?  JSON.parse(boardFromStorage) :  Array(9).fill(null)
  } );


  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  });


  //null es que no hay ganador, false es empate, (X u O es winner pero so agregados por omision )
  const [winner, setWinner] = useState(null)



  const resetGame = () => {
    //Resetar todos los estados (3 en este caso) - no actualizar la pagina
    setBoard(Array(9).fill(null)),
    setTurn(TURNS.X),
    setWinner(null)
    
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
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

    //Guardar aqui la partida
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)

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
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
