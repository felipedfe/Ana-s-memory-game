import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';
import { backImage1 } from '../images/back-image';
import '../style/StartScreeen.css'

function StartScreen({ children }) {
  // State
  // const [setSelectedDifficulty] = useState(false);

  const { cardList,
    setCardList,
    // setDifficultyLevel,
    theme,
    setBackImage } = useContext(myContext);

  console.log("-->", cardList)


  const navigate = useNavigate();

  const SHUFFLE_NUMBER = 0.5;
  // const NUM_OF_CARDS_EASY = 12;
  const NUM_OF_CARDS_HARD = 20;

  const filterByDifficulty = (numberOfCards) => {
    return cardList.filter((_, index) => index < numberOfCards)
      .sort(() => Math.random() - SHUFFLE_NUMBER)
  }

  // Filtra as cartas de acordo com a dificuldade
  // const difficultySelection = ({ target: { value } }) => {
  //   setSelectedDifficulty(true);
  //   switch (value) {
  //     case 'easy':
  //       setCardList(filterByDifficulty(NUM_OF_CARDS_EASY));
  //       setDifficultyLevel(value);
  //       break;
  //     case 'hard':
  //       setCardList(filterByDifficulty(NUM_OF_CARDS_HARD));
  //       setDifficultyLevel(value);
  //       break;
  //     default:
  //       return null;
  //   }
  // }

  // Função que renderiza os botões para escolha da dificuldade
  // const chooseDifficulty = () => {
  //   return (
  //     <div className="difficulty-btns-container">
  //       <button
  //         className="navigation-button"
  //         type="button"
  //         value="easy"
  //         onClick={(event) => { difficultySelection(event) }}
  //       >
  //         Fácil
  //       </button>
  //       <button
  //         className="navigation-button"
  //         type="button"
  //         value="hard"
  //         onClick={(event) => { difficultySelection(event) }}
  //       >
  //         Difícil
  //       </button>
  //     </div>
  //   )
  // }

  const shuffleCardsAndStart = () => {
    setCardList(filterByDifficulty(NUM_OF_CARDS_HARD));
    setBackImage(backImage1)
    navigate("/gameboard");
  };

  // Função que renderiza as opções para escolha do verso das cartas
  // const chooseCardBack = () => {
  //   return (
  //     <div className="choose-cardback-container">
  //       <div className="choose-text">
  //         <h4>Selecione a imagem do verso da carta</h4>
  //       </div>
  //       <div
  //         className="backimages-container"
  //         onClick={shuffleCardsAndStart}
  //       >
  //         <input
  //           className="cardBack"
  //           type="image"
  //           name="backImage3"
  //           alt="coração"
  //           src={backImage3}
  //           onClick={() => setBackImage(backImage3)}
  //         />
  //         {/* <input
  //           className="cardBack"
  //           type="image"
  //           name="backImage3"
  //           alt="xis"
  //           src={backImage2}
  //           onClick={() => setBackImage(backImage2)}
  //         /> */}
  //         <input
  //           className="cardBack"
  //           type="image"
  //           name="backImage3"
  //           alt="cinza"
  //           src={backImage1}
  //           onClick={() => setBackImage(backImage1)}
  //         />
  //       </div>
  //     </div>
  //   )
  // }

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

    const cardImages = importAllImages(require.context('../images/cartas-mata', false, /\.png$/i))
    setCardList(cardImages);
  }, [setCardList])

  return (
    <>
      {/* {children} */}
      <main id={theme} className="main-start">
        <div className="background-img"></div>
        <section className="title-section">
          <img
            className="title-image"
            alt="título - Biodiversidade em Jogo da Memória"
            src="capa.jpg" />
          <button
            className="navigation-button"
            onClick={shuffleCardsAndStart}
          >Jogar
          </button>
        </section>
      </main>
      {/* <section className='buttons-container'>
        {chooseCardBack()}
      </section> */}
    </>
  )
}

export default StartScreen;
