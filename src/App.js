import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyProvider from './provider/MyProvider';
import StartScreen from './pages/StartScreen';
import GameBoard from './pages/GameBoard';
import Header from './components/Header';

function App() {
  // const { theme } = useContext(myContext);
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <StartScreen>
              <Header />
            </StartScreen>} />
          <Route exact path="/gameboard" element={
            <GameBoard>
              <Header />
            </GameBoard>} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  )
}

export default App;
