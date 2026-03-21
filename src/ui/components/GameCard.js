import { runSimulation } from "../utils/sim.js"

export default function GameCard(game){

 const div = document.createElement("div")
 div.className="card"

 div.innerHTML = `
  <div class="arf-header">
    <h3>${game.away} @ ${game.home}</h3>
  </div>

  <div class="arf-row">
    <span>Market Spread</span>
    <span>${game.spread}</span>
  </div>

  <div class="arf-row">
    <span>Total</span>
    <span>${game.total}</span>
  </div>

  <div class="arf-row">
    <span>Sportsbook</span>
    <span>${game.book}</span>
  </div>

  <div class="arf-row">
    <span>Status</span>
    <span>${game.status}</span>
  </div>

  <div class="arf-row prob">
    <span>Model Cover Prob</span>
    <span>Simulating…</span>
  </div>
 `

 runSimulation(game.spread,prob=>{
   div.querySelector(".prob span:last-child").innerText =
      (prob*100).toFixed(2)+"%"
 })

 return div
}