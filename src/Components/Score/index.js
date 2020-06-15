import React, { useState, useEffect, useReducer } from 'react';
import './style.css'
import ScoreHistory from '../ScoreHistory';

const Score = ({session, start, gameSession}) => {
  const [round, setRound] = useReducer((state,action) => {
    switch (action.type) {
      case "add": 
        let arr = [];
        switch (action.round) {
          case 0:
            arr = [...state];
            arr[0].winner = action.team; arr[0].pointsWon = action.pointsWon; arr[0].win = action.win;
            return [...arr,  {
              number: state.length, 
              bonus: 75, 
              winner: 0, 
              pointsWon: 0,
              win: ''
            }]; 
          case 1:
              arr = [...state];
              arr[1].winner = action.team; arr[1].pointsWon = action.pointsWon; arr[1].win = action.win;
              return [...arr,  {
                number: state.length, 
                bonus: 50, 
                winner:  0, 
                pointsWon: 0,
                win: ''
              }]; 
          case 2:
              arr = [...state];
              arr[2].winner = action.team; arr[2].pointsWon = action.pointsWon; arr[2].win = action.win;
              return [...arr,  {
                number: state.length, 
                bonus: 25, 
                winner:  0, 
                pointsWon: 0,
                win: ''
              }]; 
          case (state.length-1):
              arr = [...state];
              arr[state.length-1].winner = action.team; arr[state.length-1].pointsWon = action.pointsWon; arr[state.length-1].win = action.win;
              return [...arr,  {
                number: state.length, 
                bonus: 0, 
                winner:  0, 
                pointsWon: 0,
                win: ''
              }]; 
        }
        break;
        case "clear":
          return [{number: 0, bonus: 100, winner: 0, pointsWon: 0, win: ''}];
        default: 
          return state;
    }
  }, [{number: 0, bonus: 100, winner: 0, pointsWon: 0, win: ''}]);

  const [team1Points, setTeam1Points] =  useState();
  const [team2Points, setTeam2Points] = useState();
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [winner, setWinner] = useState();

  const resetGame = () => {
    setRound({type: 'clear'});
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Points(0);
    setTeam2Points(0);
  }
  useEffect(()=> {
    if(session && start) {
    }
    else {
      resetGame();
    }
  }, [start])
  
  useEffect(()=> {
    if(team1Score >= 500) {
      alert('team 1 wins')
      setWinner('1');
      // resetGame();
    }
    else if(team2Score >= 500) {
      alert('team 2 wins')
      setWinner('2');
      // resetGame();
    }
  }, [team1Score,team2Score])

  const handleScore = (bonus,team,winType) => {
    // Which team do we add the score to
    const pointsWon = team === 1 ?  team1Points + bonus + round[round.length-1].bonus : team2Points + bonus + round[round.length-1].bonus;
    const newScore = team === 1 ? team1Score + pointsWon : team2Score + pointsWon;
    
    if(team === 1) {
      setTeam1Score(newScore)
    }
    else {
      setTeam2Score(newScore)
    }
    setRound({type: 'add', round: round.length-1 ,pointsWon: team === 1 ? team1Points : team2Points, team: team, win: winType })
    
    setTeam1Points(0);
    setTeam2Points(0);
  }

  const handleChange = e => {
    if(e.target.name === 'team1') {
      if (!isNaN(e.target.value)) {
        setTeam1Points(Number(e.target.value))        
      }
    }
    else {
      if (!isNaN(e.target.value)) {
        setTeam2Points(Number(e.target.value))
      }
    }
  } 
  const handleKeyDown = e => {
    if  (e.keyCode === 8 && (e.target.value.length === 1)) {
      e.target.value = "";
    }
  }

  if (session && start) {
    return (
      <div className="game-scores-wrapper">
        <div className="score-header-main">
          <h1>Round { round.length }</h1>
          <p className={round[round.length-1].bonus > 0 ? 'bonus-on' : 'bonus-off'}>Bonus: { round[round.length-1].bonus > 0 ? round[round.length-1].bonus : 'None' }</p>
        </div>
        <div className="game-scores">
          <div className="team-1">
            <div className="score-header">
              <h2>Team 1: { `${gameSession.players[0].name} and ${gameSession.players[1].name}` } </h2>
              <p className={team1Score > team2Score ? 'score-winning' : 'score-losing'}><b>Score: { team1Score }</b></p>
            </div>
            <div className="score-form">
              <input placeholder="Points" name="team1" value={team1Points} className="form-control" onChange={handleChange} onKeyDown={handleKeyDown}></input>
              <button className="btn btn-primary" onClick={() => handleScore(0,1, 'Regular Win')} disabled={typeof(winner) != 'undefined'}>Regular Win</button>    
              <button className="btn btn-capicu" onClick={() => handleScore(100,1, 'Capicu')} disabled={typeof(winner) != 'undefined'}>Capicu!</button>
              <button className="btn btn-chuchazo" onClick={() => handleScore(100,1, 'Chuchazo')} disabled={typeof(winner) != 'undefined'}>Chuchazo!</button>
            </div>
            <ScoreHistory rounds={round} team="1" />
          </div>
          <div className="team-2">
            <div className="score-header"> 
              <h2>Team 2: { `${gameSession.players[2].name} and ${gameSession.players[3].name}` } </h2>
              <p className={ team2Score > team1Score ? 'score-winning' : 'score-losing'}><b>Score: { team2Score }</b></p>
            </div>
            <div className="score-form">
              <input placeholder="Points" name="team2" value={team2Points} className="form-control" onChange={handleChange} onKeyDown={handleKeyDown}></input>
              <button className="btn btn-primary" onClick={() => handleScore(0,2, 'Regular Win')} disabled={typeof(winner) != 'undefined'}>Regular Win</button>    
              <button className="btn btn-capicu" onClick={() => handleScore(100,2, 'Capicu')} disabled={typeof(winner) != 'undefined'}>Capicu!</button>
              <button className="btn btn-chuchazo" onClick={() => handleScore(100,2, 'Chuchazo')} disabled={typeof(winner) != 'undefined'}>Chuchazo!</button>
            </div>
            <ScoreHistory rounds={round} team="2" />
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