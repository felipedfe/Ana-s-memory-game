import React, { useEffect, useState, useContext } from 'react';
import myContext from '../context/myContext';

function Timer(props) {
  const { sec, min } = props;
  // State
  const [seconds, setSeconds] = useState(sec);
  const [minutes, setMinutes] = useState(min);

  const { timeOver, setTimeOver, id, setId } = useContext(myContext)

  useEffect(() => {
    const ONE_SECOND = 1000;

    const ID = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, ONE_SECOND);
    setId(ID);
    console.log(id)
    setTimeOver(false);
    return () => clearInterval(ID);
  }, [])


  useEffect(() => {
    if (seconds === -1) {
      setSeconds(59);
      setMinutes(minutes - 1);
      if (minutes === 0) {
        setSeconds(0);
        setMinutes(0);
        console.log(timeOver)
        console.log('acabou')
        setTimeOver(true);
      }
    }
  }, [seconds, minutes])

  return (
    <>
      <div className="timer-container">
        <span>
          {minutes.toString().padStart(2, "0")}
          :
          {seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </>
  )
}


export default Timer;
