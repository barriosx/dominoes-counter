import React, { useState, useEffect } from 'react';

const Score = ({session, start, gameSession}) => {
  const [round, setRound] = useState({number: 0, bonus: 100});
  const [team1Points, setTeam1Points] =  useState();
  const [team2Points, setTeam2Points] = useState();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const resetGame = () => {
    setRound({number: 0, bonus: 100});
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Points(0);
    setTeam2Points(0);
  }
  useEffect(()=> {
    if(session && start) {
      console.log(gameSession)
    }
    else {
      resetGame();
    }
  }, [start])
  
  useEffect(()=> {
    if(team1Score >= 500) {
      alert('team 1 wins')
      resetGame();
    }
    else if(team2Score >= 500) {
      alert('team 2 wins')
      resetGame();
    }
  }, [team1Score,team2Score])

  const handleScore = (bonus,team) => {
    // Which team do we add the score to
    if(team === 1) {
      setTeam1Score(team1Score + team1Points + bonus + round.bonus)
      setTeam1Points(0);
    }
    else {
      setTeam2Score(team2Score + team2Points + bonus + round.bonus)
      setTeam2Points(0);
    }
    
    // Update bonus points based on round number
    switch (round.number) {
      case 0:
        setRound({
          number: round.number + 1,
          bonus: 75
        })
        break;
      case 1:
        setRound({
          number: round.number + 1,
          bonus: 50
        })
        break;
      case 2:
        setRound({
          number: round.number + 1,
          bonus: 25
        })
        break;
      default:
        setRound({
          number: round.number + 1,
          bonus: 0
        })
        break;
    }
  }

  const handleChange = e => {
    if(e.target.name === 'team1') {
      setTeam1Points(isNaN(e.target.value) ? 0 : Number(e.target.value))
    }
    else {
      setTeam2Points(isNaN(e.target.value) ? 0 : Number(e.target.value))
    }
  } 


  if (session && start) {
    return (
      <div className="game-score">
        <h1>Round { round.number + 1 }</h1>
        <p>Round Bonus: { round.bonus > 0 ? round.bonus : 'None' }</p>
        <div className="team-1">
          <h2>Team 1: { `${gameSession.players[0].name} and ${gameSession.players[1].name}` } </h2>
          <p>Score: { team1Score }</p>
          <input placeholder="Points" name="team1" className="form-control" value={team1Points} onChange={handleChange}></input>
          <button onClick={() => handleScore(0,1)}>Regular Win</button>    
          <button onClick={() => handleScore(100,1)}>Capicu!</button>
          <button onClick={() => handleScore(100,1)}>Chuchazo!</button>

        </div>
        <div className="team-2">
          <h2>Team 2: { `${gameSession.players[2].name} and ${gameSession.players[3].name}` } </h2>
          <p>Score: { team2Score }</p>
          <input placeholder="Points" name="team2" className="form-control" value={team2Points} onChange={handleChange}></input>
          <button onClick={() => handleScore(0,2)}>Regular Win</button>    
          <button onClick={() => handleScore(100,2)}>Capicu!</button>
          <button onClick={() => handleScore(100,2)}>Chuchazo!</button>
        </div>
      </div>
    )
  }
  else {
    return null;
  }

}

export default Score;