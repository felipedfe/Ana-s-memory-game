import React, { useContext } from 'react';
import myContext from '../context/myContext';
import { useNavigate } from 'react-router-dom';

function Options({ children }) {
  const { cardList, setCardList} = useContext(myContext);
  const navigate = useNavigate();

  const NUM_OF_CARDS_EASY = 12;
  const NUM_OF_CARDS_HARD = 24;

  const filterByDifficulty = (numberOfCards) => {
    return cardList.filter((_, index) => index < numberOfCards)
  }

  const handleChange = ({ target: { value } }) => {
    switch(value) {
      case 'easy':
        return setCardList(filterByDifficulty(NUM_OF_CARDS_EASY ))
      case 'hard':
        return setCardList(filterByDifficulty(NUM_OF_CARDS_HARD))
      default:
        return null;
    }
  }
  return (
    <>
      {children}
      <section className="options-container">
        <h1>Opções</h1>
        {/* <select onChange={(event) => {handleChange(event)}}>
          <option value="easy">Fácil</option>
          <option value="difficult">Difícil</option>
        </select> */}
        <button
          type="button"
          value="easy"
          onClick={(event) => {handleChange(event)}}
        >
          Fácil
        </button>
        <button
          type="button"
          value="hard"
          onClick={(event) => {handleChange(event)}}
        >
          Difícil
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
        >
          Voltar
        </button>
      </section>
    </>
  )
}

export default Options;