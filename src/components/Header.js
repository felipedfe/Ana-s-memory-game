import React, { useContext, useRef } from 'react'
import Timer from './Timer';
import '../style/Header.css'
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';

function Header() {
  const { pathname } = useLocation();
  const { difficultyLevel, theme, setTheme } = useContext(myContext);

  const toggleTheme = () => {
    console.log(theme);
    if (theme === '') {
      setTheme('pink');
      document.body.style.backgroundColor = "pink";
    } else {
      setTheme('');
      document.body.style.backgroundColor = "rgb(151, 255, 148)";
    }
  };

  const renderTimer = () => {
    switch (difficultyLevel) {
      case 'easy':
        return <Timer sec={50} min={0} />
      case 'hard':
        return <Timer sec={50} min={1} />
      default:
        return null;
    }
  }

  const pinkModeText = useRef();

  // console.log(pinkModeText.current.classList)

  return (
    <section className="header-section">
      <button type="button" onClick={() => {
        pinkModeText.current.classList.add("teste");
        console.log(pinkModeText.current.classList)
        console.log(pinkModeText.current.classList)
      }}>clica</button>
      {pathname === '/gameboard' &&
        renderTimer()}
      <span className="pink-mode-text" ref={pinkModeText}>PINK MODE &rarr;</span>
      <button className="pink-mode-button"
        type="button"
        onClick={toggleTheme}
      />
    </section>
  )
}

export default Header;
