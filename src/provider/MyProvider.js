import React, { useState } from "react";
import myContext from "../context/myContext";

function MyProvider(props) {
  // State
  const [cardList, setCardList] = useState([]);
  const [numberOfSelected, setNumberOfSelected] = useState(0);
  const [idsForComparison, setIdsForComparison] = useState([]);
  const [waitForTimeout, setWaitForTimeout] = useState(false);
  const [backImage, setBackImage] = useState('');

  // useEffect(() => {
  //   const importAllImages = (require) => {
  //     const imagesList = [];
  //     require.keys().map((key) => {
  //       return imagesList.push({
  //         id: key.substring(2, 6),
  //         imageSource: require(key),
  //         selected: false,
  //         turnedUp: false,
  //       })
  //     })
  //     return imagesList;
  //   };

  //   const cardImages = importAllImages(require.context('../images/', false, /\.png$/i))
  //   setCardList(cardImages);
  //   // console.log(cardImages);
  // }, [])

  const providerState = {
    cardList,
    setCardList,
    numberOfSelected,
    setNumberOfSelected,
    idsForComparison,
    setIdsForComparison,
    waitForTimeout,
    setWaitForTimeout,
    backImage,
    setBackImage
  }
  return (
    <myContext.Provider value={providerState}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyProvider;
