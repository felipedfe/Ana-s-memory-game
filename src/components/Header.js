import React, { useContext } from 'react'
import Timer from './Timer';
import '../style/header.css'
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';

function Header() {
  const { pathname } = useLocation();
  const { difficultyLevel, theme, setTheme } = useContext(myContext);

  const toggleTheme = () => {
    if (theme === '') {
      setTheme('pink');
      document.body.style.backgroundColor = "rgb(237, 120, 255)"
      document.body.style.backgroundImage = "url('bolas-pink.png')";
    } else {
      setTheme('');
      document.body.style.backgroundColor = "rgb(151, 255, 148)";
      document.body.style.backgroundImage = "url('bolas4.png')";
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


  return (
    <section className="header-section">
      {pathname === '/gameboard' &&
        renderTimer()}
      <span className="pink-mode-text" >PINK MODE &rarr;</span>
      <button className="pink-mode-button"
        type="button"
        onClick={toggleTheme}
      />
    </section>
  )
}

export default Header;
