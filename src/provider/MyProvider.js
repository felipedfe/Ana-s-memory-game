import React, { useState } from "react";
import myContext from "../context/myContext";

function MyProvider(props) {
  // State
  const [cardList, setCardList] = useState([]);
  const [numberOfSelected, setNumberOfSelected] = useState(0);
  const [idsForComparison, setIdsForComparison] = useState([]);
  const [waitForTimeout, setWaitForTimeout] = useState(false);
  const [backImage, setBackImage] = useState('');
  const [timeOver, setTimeOver] = useState(false);
  const [id, setId] = useState(undefined);
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [theme, setTheme] = useState('');

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
    setBackImage,
    timeOver,
    setTimeOver,
    id,
    setId,
    difficultyLevel,
    setDifficultyLevel,
    theme,
    setTheme,
  }
  return (
    <myContext.Provider value={providerState}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyProvider;
