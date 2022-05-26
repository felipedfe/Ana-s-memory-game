import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';
import Card from './Card';

function GameBoard() {
  const { cardList,
    setCardList,
    numberOfSelected,
    setNumberOfSelected,
    idsForComparison,
    setIdsForComparison,
    setWaitForTimeout } = useContext(myContext);

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
  const updateList = () => {
    idsForComparison.forEach((id) => {
      const cardIndex = cardList.findIndex((item) => item.id === id);
      const selectedCard = cardList.find((item) => item.id === id);
      const filteredList = cardList.filter((item) => item.id !== id);
      selectedCard.turnedUp = true;
      filteredList.splice(cardIndex, 0, selectedCard);
      setCardList(filteredList);
    })
  }

  // Nessa função, depois de 1s o cardList é atualizado e o onClick das cartas é liberado novamente
  const updateCardListSate = (newList) => {
    setCardList(newList);
    setWaitForTimeout(false);
  }

  // Se duas cartas forem selecionadas essa verificação acontece
  useEffect(() => {
    if (numberOfSelected === 2) {
      if (compareIds(idsForComparison)) {
        updateList()
        const cardListSelectedFalse = deselectAllCards();
        setCardList(cardListSelectedFalse);
      } else {
        const cardListSelectedFalse = deselectAllCards();
        setWaitForTimeout(true);
        setTimeout(() => updateCardListSate(cardListSelectedFalse), 1000);
      }
      setNumberOfSelected(0);
      setIdsForComparison([]);
    }
  }, [numberOfSelected])

  return (
    <div className="cards-container">
      {cardList.map((card) => <Card
        key={card.id}
        id={card.id}
        selected={card.selected}
        turnedUp={card.turnedUp}
        imageSource={card.imageSource} />)}
      {numberOfSelected}
    </div>
  )
}
export default GameBoard;
