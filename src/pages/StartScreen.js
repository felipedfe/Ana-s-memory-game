import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartScreen({ children }) {
  const navigate = useNavigate();

  return (
    <main>
      {children}
      <h1>Jogo da Memória da Ana</h1>
      <section className='buttons-container'>
        <button
          type='button'
          onClick={() => navigate('/gameboard')}
        >
          Jogar!
        </button>
        <button
          type='button'
          onClick={() => navigate('/options')}
        >
          Opções
        </button>
      </section>
    </main>
  )
}

export default StartScreen;