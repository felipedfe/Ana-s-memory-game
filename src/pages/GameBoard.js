import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
import Card from '../components/Card';
import '../style/Gameboard.css'

function GameBoard({ children }) {
  const { cardList,
    setCardList,
    numberOfSelected,
    setNumberOfSelected,
    idsForComparison,
    setIdsForComparison,
    setWaitForTimeout,
    timeOver,
    difficultyLevel,
    theme,
    id } = useContext(myContext);

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  // State
  const [allTurnedUp, setAllTurnedUp] = useState(false)

  // Função que verifica se as cartas são iguais
  const compareIds = (idsArray) => {
    const id1 = idsArray[0].substring(0, 2);
    const id2 = idsArray[1].substring(0, 2);
    return id1 === id2;
  }

  const deselectAllCards = () => {
    return cardList.map((item) => ({
      ...item,
      selected: false,
    }));
  }

  // Função que atualiza a lista setando os ids como turnedUp: true
  const updateTurnedUp = () => {
    idsForComparison.forEach((id) => {
      for (let card of cardList) {
        if (card.id === id) card.turnedUp = true;
      }
      setCardList(cardList);
    })
  }

  // Nessa função, depois de 1s o cardList é atualizado e o onClick das cartas é liberado novamente
  const updateCardListState = (newList) => {
    setCardList(newList);
    setWaitForTimeout(false);
  }

  const renderingConditions = () => {
    if (timeOver) {
      console.log("--->", timeOver)
      return <h1 className="end-message">Você perdeu!</h1>
    }
    if (allTurnedUp) {
      return <h1 className="end-message">Você Ganhou!</h1>
    } else {
      console.log(timeOver)
      return cardList.map((card) => <Card
        key={card.id}
        id={card.id}
        selected={card.selected}
        turnedUp={card.turnedUp}
        imageSource={card.imageSource} />)
    }
  }

  // Se duas cartas forem selecionadas essa verificação acontece
  useEffect(() => {
    if (numberOfSelected === 2) {
      if (compareIds(idsForComparison)) {
        updateTurnedUp()
        const cardListSelectedFalse = deselectAllCards();
        setCardList(cardListSelectedFalse);
      } else {
        const cardListSelectedFalse = deselectAllCards();
        setWaitForTimeout(true);
        setTimeout(() => updateCardListState(cardListSelectedFalse), 1000);
      }
      setNumberOfSelected(0);
      setIdsForComparison([]);
    }
  }, [numberOfSelected])

  // Verifica se o jogador conseguiu achar todos os pares
  useEffect(() => {
    if (cardList.every((card) => card.turnedUp) && cardList.length !== 0) {
      console.log("VOCÊ GANHOU!")
      setAllTurnedUp(true);
      clearInterval(id)
      console.log(id)
    }
    console.log(cardList)
  }, [cardList])

  return (
    <section id={theme} className="gameboard">
      {children}
      <div className={difficultyLevel === 'easy'? "cards-container-easy":"cards-container"}>
        {renderingConditions()}
      </div>
      <button
        className="navigation-button"
        id="back-button"
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </section>
  )
}
export default GameBoard;
