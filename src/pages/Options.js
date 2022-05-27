import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Options({ children }) {
  const { setDifficulty } = useContext(myContext);
  const handleChange = ({ target }) => {
    setDifficulty(target.value)
  }
  return (
    <>
      {children}
      <section className="options-container">
        <h1>Opções</h1>
        <select onChange={(event) => {handleChange(event)}}>
          <option value="easy">Fácil</option>
          <option value="difficult">Difícil</option>
        </select>
      </section>
    </>
  )
}

export default Options;