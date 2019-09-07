import React from 'react';
import './style.css';


function Header({session, start , newGame}) {
  let gameButton = session && start  ? <li><button className="btn btn-secondary" onClick={newGame}>New Game</button></li> : null;
  return (
    <div className="header">
      <ul>
        <li>CapiCount</li>
        {/* If there is a game in progress, offer new game, if not then only show logo */}
        {gameButton}
      </ul>
    </div>
  )
}

export default Header;