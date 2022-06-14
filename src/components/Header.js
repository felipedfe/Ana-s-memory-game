import React from 'react'
import Timer from './Timer';
import '../style/Header.css'

function Header () {
  return (
    <section className="header-section">
      <Timer sec={40} min={0} />
    </section>
  )
}

export default Header;
