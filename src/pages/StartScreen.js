import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';
import { backImage1, backImage2, backImage3 } from '../images/back-image';
import '../style/StartScreeen.css'

function StartScreen({ children }) {
  // State
  const [selectedDifficulty, setSelectedDifficulty] = useState(false);

  const { cardList,
    setCardList,
    setDifficultyLevel,
    theme,
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
        setCardList(filterByDifficulty(NUM_OF_CARDS_EASY));
        setDifficultyLevel(value);
        break;
      case 'hard':
        setCardList(filterByDifficulty(NUM_OF_CARDS_HARD));
        setDifficultyLevel(value);
        break;
      default:
        return null;
    }
  }

  // Função que renderiza os botões para escolha da dificuldade
  const chooseDifficulty = () => {
    return (
      <div className="difficulty-btns-container">
        <button
          className="navigation-button"
          type="button"
          value="easy"
          onClick={(event) => { difficultySelection(event) }}
        >
          Fácil
        </button>
        <button
          className="navigation-button"
          type="button"
          value="hard"
          onClick={(event) => { difficultySelection(event) }}
        >
          Difícil
        </button>
      </div>
    )
  }

  // Função que renderiza as opções para escolha do verso das cartas
  const chooseCardBack = () => {
    return (
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
            onClick={() => setBackImage(backImage3)}
          />
          <input
            className="cardBack"
            type="image"
            name="backImage3"
            alt="xis"
            src={backImage2}
            onClick={() => setBackImage(backImage2)}
          />
          <input
            className="cardBack"
            type="image"
            name="backImage3"
            alt="cinza"
            src={backImage1}
            onClick={() => setBackImage(backImage1)}
          />
        </div>
      </div>
    )
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

    const cardImages = importAllImages(require.context('../images/cartas-ana', false, /\.png$/i))
    setCardList(cardImages);
  }, [])

  return (
    <>
      {children}
      <main id={theme}>
        <section className="title-section">
          <div className="title-background">
            <div className="title-part-1">
              <h2 className="title">Jogo da Memória</h2>
            </div>
            <div className="title-part-2">
              <h3 className="title">da</h3>
              <p className="heart-icon-l">&hearts;</p>
              <h1 className="ana-title">Ana</h1>
              <p className="heart-icon-r">&hearts;</p>
            </div>
          </div>
        </section>
      </main>
      <section className='buttons-container'>
        {selectedDifficulty ?
          chooseCardBack() :
          chooseDifficulty()
        }
      </section>
    </>
  )
}

export default StartScreen;