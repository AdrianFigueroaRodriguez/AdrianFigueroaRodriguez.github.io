
import { getOdds } from "../../api/oddsApi.js"
import GameCard from "../components/GameCard.js"

export default function Dashboard(){

 const container = document.createElement("div")
 const grid = document.createElement("div")

 grid.className="grid"
 container.appendChild(grid)

 async function load(){

   const games = await getOdds()

   grid.innerHTML=""

   games.forEach(g=>{
     grid.appendChild(GameCard(g))
   })
 }

 load()

 return container
}
