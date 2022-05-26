import React from 'react';
import './App.css';
import MyProvider from './provider/MyProvider';
import GameBoard from './components/GameBoard'

function App() {
  return (
    <MyProvider>
      <div className="board-continer">
        <p>Jogo da memória</p>
        <GameBoard />
      </div>
    </MyProvider>
  )
}

export default App;
