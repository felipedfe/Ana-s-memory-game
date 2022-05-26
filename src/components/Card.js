import React, { useContext } from "react";
import myContext from "../context/myContext";
import backImage from '../images/back-image'

function Card(props) {
  const { id, imageSource, selected, turnedUp } = props;
  const { cardList,
    setCardList,
    numberOfSelected,
    setNumberOfSelected,
    idsForComparison,
    setIdsForComparison,
    waitForTimeout } = useContext(myContext);

  // Função que atualiza a lista setando a carta clicada como selected: true
  const updateList = () => {
    const cardIndex = cardList.findIndex((item) => item.id === id);
    const selectedCard = cardList.find((item) => item.id === id);
    const filteredList = cardList.filter((item) => item.id !== id);
    selectedCard.selected = true;
    filteredList.splice(cardIndex, 0, selectedCard);
    setCardList(filteredList);
  }

  const handleClick = () => {
    updateList()
    setNumberOfSelected(numberOfSelected + 1);
    setIdsForComparison([...idsForComparison, id])
  }

  return (
    <div className="card-container">
      <button
        type="button"
        className="card-button"
        onClick={(selected || turnedUp || waitForTimeout) ? null : handleClick}>
        <img src={(selected || turnedUp) ? imageSource : backImage} alt={id} />
      </button>
    </div>
  )
}

export default Card;
