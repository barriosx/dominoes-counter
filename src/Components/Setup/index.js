import React, { useState, useEffect } from 'react';
import './style.css';

const Setup = ({session, start, handleSession, handleGameConfig}) => {
  let gameType, playerNames; // Will hold html boiler plate
  
  const [config, setConfig] = useState({
    type: '2V2',
    players: [
      {
        name: '',
        team: '1',
      },
      {
        name: '',
        team: '1',
      },
      {
        name: '',
        team: '2',
      },
      {
        name: '',
        team: '2',
      }
    ]
  }); 
  useEffect(()=>{
    if (!session && !start) {
      setConfig({  type: '2V2',
      players: [
        {
          name: '',
          team: '1',
          score: 0,
          wins: 0
        },
        {
          name: '',
          team: '1',
          score: 0,
          wins: 0
        },
        {
          name: '',
          team: '2',
          score: 0,
          wins: 0
        },
        {
          name: '',
          team: '2',
          score: 0,
          wins: 0
        }
      ]})
      handleSession(true); 
    }
  }, [session,start])
  const setGameType = game => {
    // This function helps set up the "config" state inside this Setup component, as well as lifting up the state of "game" in the App component
    setConfig({ ...config, type: game });
    handleSession(true); // Changes state of game to true in App component 
  }
  const handlePlayerNameChange = formIndex => e => {
    // Handle all player names
    const newPlayers = config.players.map((player, i)=>{
        if (i !== formIndex) {
          return player;
        }
        else {
          return { ...player, name: e.target.value };
        }
    });
    setConfig({ ...config, players: newPlayers});
  }
  const sendConfig = () => {
    // Handle start of Game
    if (config.players.some((player)=>{ return player.name.length < 1 })) {
      alert("Fill in all player names before starting!")
    }
    else {
      handleSession(true); // Changes state of game to true in App component 
      handleGameConfig(config); // Start the game!
    }
  }

  // Set up Game Type and Player Names
  if(!session && !start) {
    // Create a game if there isn't one created
    //  gameType = (
    //   <div className="game-type">
    //     <p>Select game mode</p>
    //     {/* <button className="btn game-type ffa" onClick={() => setGameType('FFA')}>Free for All</button> */}
    //     <button className="btn btn-secondary" onClick={() => setGameType('2V2')}>Teams</button>
    //   </div>
    // );
    // playerNames = null;
  }
  else {
    // Creating a game, need players
    gameType = null;
    if (config.type !== '') {
      playerNames = (
        <div>
          <div className="game-players">
            <h3>Team 1</h3>
            {
              config.players.map( (player,i) => {
                  if (i < 2) {
                    return (
                      <input key={i} className="form-control control-team-1" placeholder={`Player ${i+1}`} value={player.name} onChange={handlePlayerNameChange(i)} />
                    );       
                  }
                }
              )
            }
            <h3>Team 2</h3>
            {
              config.players.map( (player,i) => {
                if (i > 1) {
                  return (
                    <input key={i} className="form-control control-team-1" placeholder={`Player ${i-1}`} value={player.name} onChange={handlePlayerNameChange(i)} />
                  );       
                }
              })
            }
          </div>
          <button className="btn btn-primary" onClick={sendConfig}>Start Game!</button>   
        </div>
      );
    }
    else {
      console.log("Attempting to create players without seleting a game type...");
    }
  }
  if(session && start) {
    return null;
  }
  else {
    return (
      <div className="game-setup">
        {
          gameType
        }
        {
          playerNames
        }
      </div>
    );
  }
}

export default Setup;