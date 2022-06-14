import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';
import backImage1, { backImage2, backImage3 } from '../images/back-image';
import '../style/StartScreen.css'

function StartScreen({ children }) {
  // State
  const [selectedDifficulty, setSelectedDifficulty] = useState(false);

  const { cardList,
    setCardList,
    backImage,
    setBackImage } = useContext(myContext);

  const navigate = useNavigate();

  const SHUFFLE_NUMBER = 0.5;
  const NUM_OF_CARDS_EASY = 12;
  const NUM_OF_CARDS_HARD = 24;

  const filterByDifficulty = (numberOfCards) => {
    return cardList.filter((_, index) => index < numberOfCards)
      .sort(() => Math.random() - SHUFFLE_NUMBER)
  }

  // Filtra as cartas de acordo com a dificuldade
  const difficultySelection = ({ target: { value } }) => {
    setSelectedDifficulty(true);
    switch (value) {
      case 'easy':
        return setCardList(filterByDifficulty(NUM_OF_CARDS_EASY))
      case 'hard':
        return setCardList(filterByDifficulty(NUM_OF_CARDS_HARD))
      default:
        return null;
    }
  }

  const backImageSelection = (backImageName) => {
    setBackImage(backImageName);
  }

  // Busca as imagens da pasta "images"
  useEffect(() => {
    const importAllImages = (require) => {
      const imagesList = [];
      require.keys().map((key) => {
        return imagesList.push({
          id: key.substring(2, 6),
          imageSource: require(key),
          selected: false,
          turnedUp: false,
        })
      })
      return imagesList;
    };

    const cardImages = importAllImages(require.context('../images/', false, /\.png$/i))
    setCardList(cardImages);
    // console.log(cardImages);
  }, [])

  return (
    <main>
      {children}
      <section className="title-section">
        <div className="title-part-1">
          <h2 className="title">Jogo da Memória</h2>
        </div>
        <div className="title-part-2">
          <h3 className="title">da</h3>
          <h1 className="ana-title">*Ana*</h1>
        </div>
      </section>
      <section className='buttons-container'>
        {selectedDifficulty ?
          <div className="choose-cardback-container">
            <div className="choose-text">
              <h4>Selecione a imagem do verso da carta :)</h4>
            </div>
            <div
              className="backimages-container"
              onClick={() => navigate('/gameboard')}
            >
              <input
                className="cardBack"
                type="image"
                name="backImage3"
                alt="coração"
                src={backImage3}
                onClick={() => backImageSelection(backImage3)}
              />
              <input
                className="cardBack"
                type="image"
                name="backImage3"
                alt="xis"
                src={backImage2}
                onClick={() => backImageSelection(backImage2)}
              />
              <input
                className="cardBack"
                type="image"
                name="backImage3"
                alt="cinza"
                src={backImage1}
                onClick={() => backImageSelection(backImage1)}
              />
            </div>
          </div> :
          <div className="difficulty-btns-container">
            <button
              className="easy-button"
              type="button"
              value="easy"
              onClick={(event) => { difficultySelection(event) }}
            >
              Fácil
            </button>
            <button
              className="hard-button"
              type="button"
              value="hard"
              onClick={(event) => { difficultySelection(event) }}
            >
              Difícil
            </button>
          </div>
        }
      </section>
    </main>
  )
}

export default StartScreen;