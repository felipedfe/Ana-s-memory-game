import React, { useContext } from "react";
import myContext from "../context/myContext";
// import backImage1 from '../images/back-image'

function Card(props) {
  const { id, imageSource, selected, turnedUp } = props;
  const { cardList,
    setCardList,
    numberOfSelected,
    setNumberOfSelected,
    idsForComparison,
    setIdsForComparison,
    waitForTimeout,
    backImage } = useContext(myContext);

  // Função que atualiza a lista setando a carta clicada como selected: true
  const updateSelected = () => {
    for (let card of cardList) {
      if (card.id === id) card.selected = true;
    }
    setCardList(cardList);
  }

  const handleClick = () => {
    updateSelected()
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