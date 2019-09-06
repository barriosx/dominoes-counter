import React, { useState } from 'react';
import Header from './Components/Header'
import Score from './Components/Score'
import Setup from './Components/Setup'
import './App.css';

function App() {
  const [game, setGame] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [gameConfig, setGameConfig] = useState([]);

  const newGame = () => {
    setGame(false);
    setGameStart(false);
    setGameConfig({});
  } 
  const handleSession = (isNewGame) => {
    setGame(isNewGame);
  }
  const handleGameConfig = (config) => {
    setGameStart(true)
    setGameConfig(config);
  }

  return (
    <div className="App">
      <Header session={game} start={gameStart} newGame={newGame} />
      <Setup session={game} start={gameStart} handleSession={handleSession} handleGameConfig={handleGameConfig}/>
      <Score session={game} start={gameStart} gameSession={gameConfig} /> 
    </div>
  );
}

export default App;
