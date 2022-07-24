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
      document.body.style.backgroundColor = "rgb(237, 120, 255)"
      document.body.style.backgroundImage = "url('bolas-pink.png')";
      // document.body.setAttribute('style', 'background-image: url("../../public/bolas4.png")' )
      // document.body.style.backgroundSize = "80px"
      console.log(document.body)
    } else {
      setTheme('');
      document.body.style.backgroundColor = "rgb(151, 255, 148)";
      document.body.style.backgroundImage = "url('bolas4.png')";
      // document.body.style.backgroundSize = "80px"
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

  // só testando o useRef, ele funciona como um querySelector
  const pinkModeText = useRef();

  return (
    <section className="header-section">
      <button type="button" onClick={() => {
        pinkModeText.current.classList.add("teste");
        console.log(pinkModeText.current.classList)
        console.log(pinkModeText.current)
      }}>teste useRef</button>
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
