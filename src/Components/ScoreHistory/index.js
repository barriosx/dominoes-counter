import React from 'react';
import './style.css'

const ScoreHistory = ({rounds, team}) => {
  if(rounds.length < 2) {
    return null;
  }
  else {
    return (
      <div className="scores-list">
        <h2>Wins</h2>
        {
          rounds.filter(item => item.winner === Number(team)).map((r,i) => {
            return (
              <div key={i}>
                <ul className="scores-stats">
                  <li className="score-round">Round {r.number + 1}:</li>
                  <li className="score-points">{r.pointsWon}{r.bonus > 0 ? ` + ${r.bonus} round bonus` : `` }{(r.win === "Capicu" || r.win === "Chuchazo"  ) ? `+ ${r.win.toLowerCase()}` : ``}</li>
                  <li className="score-round">Total: {r.pointsWon + r.bonus + ((r.win === "Capicu" || r.win === "Chuchazo"  ) ? 100 : 0)}</li>     
                </ul>
              </div>  
            )
          })
        }
      </div>
    ) 
  }


}

export default ScoreHistory;