import React, { useState, useEffect } from 'react';
import './style.css'

const Score = ({session, start, gameSession}) => {
  const [round, setRound] = useState([{number: 0, bonus: 100, winner: '', pointsWon: 0}]);
  const [team1Points, setTeam1Points] =  useState();
  const [team2Points, setTeam2Points] = useState();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const resetGame = () => {
    setRound([{number: 0, bonus: 100, winner: '', pointsWon: 0}]);
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Points(0);
    setTeam2Points(0);
  }
  useEffect(()=> {
    if(session && start) {
      console.log(round);

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
    const pointsWon = team === 1 ? team1Score + team1Points + bonus + round[round.length-1].bonus : team2Score + team2Points + bonus + round[round.length-1].bonus;
    if(team === 1) {
      setTeam1Score(pointsWon)
    }
    else {
      setTeam2Score(pointsWon)
    }
    

    switch (round[round.length-1].number) {
      case 0:
        setRound([...round, {
          number: round.length, 
          bonus: 75, 
          winner: team === 1 ? 'Team 1' : 'Team 2', 
          pointsWon: pointsWon
        }])
        break;
      case 1:
        setRound([...round, {
          number: round.length, 
          bonus: 50,
          winner: team === 1 ? 'Team 1' : 'Team 2', 
          pointsWon: pointsWon
        }])
        break;
      case 2:
        setRound([...round, {
          number: round.length,
          bonus: 25,
          winner: team === 1 ? 'Team 1' : 'Team 2', 
          pointsWon: pointsWon
        }])
        break;
      default:
        setRound([...round, {
          number: round.length,
          bonus: 0,
          winner: team === 1 ? 'Team 1' : 'Team 2', 
          pointsWon: pointsWon
        }])
        break;
    }
    setTeam1Points(0);
    setTeam2Points(0);
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
      <div className="game-scores-wrapper">
        <div className="score-header">
          <h1>Round { round.length }</h1>
          <p className={round[round.length-1].bonus > 0 ? 'bonus-on' : 'bonus-off'}>Bonus: { round[round.length-1].bonus > 0 ? round[round.length-1].bonus : 'None' }</p>
        </div>
        <div className="game-scores">
          <div className="team-1">
            <div className="score-header">
              <h2>Team 1: { `${gameSession.players[0].name} and ${gameSession.players[1].name}` } </h2>
              <p className={team1Score > team2Score ? 'score-winning' : 'score-losing'}>Score: { team1Score }</p>
            </div>
            <div className="score-form">
              <input placeholder="Points" name="team1" className="form-control" value={team1Points} onChange={handleChange}></input>
              <button className="btn btn-primary" onClick={() => handleScore(0,1)}>Regular Win</button>    
              <button className="btn btn-capicu" onClick={() => handleScore(100,1)}>Capicu!</button>
              <button className="btn btn-chuchazo" onClick={() => handleScore(100,1)}>Chuchazo!</button>
            </div>
          </div>
          <div className="team-2">
           <div className="score-header"> 
            <h2>Team 2: { `${gameSession.players[2].name} and ${gameSession.players[3].name}` } </h2>
            <p className={ team2Score > team1Score ? 'score-winning' : 'score-losing'}>Score: { team2Score }</p>
           </div>
            <div className="score-form">
              <input placeholder="Points" name="team2" className="form-control" value={team2Points} onChange={handleChange}></input>
              <button className="btn btn-primary" onClick={() => handleScore(0,2)}>Regular Win</button>    
              <button className="btn btn-capicu" onClick={() => handleScore(100,2)}>Capicu!</button>
              <button className="btn btn-chuchazo" onClick={() => handleScore(100,2)}>Chuchazo!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }

}

export default Score;