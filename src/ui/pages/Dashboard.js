import { getLiveGames } from "../../api/liveGamesApi.js"
import GameCard from "../components/GameCard.js"

export default function Dashboard(){

 const container = document.createElement("div")
 const grid = document.createElement("div")

 grid.className="grid"
 container.appendChild(grid)

 async function load(){

   try{

     const games = await getLiveGames()

     grid.innerHTML=""

     games.forEach(g=>{
       grid.appendChild(GameCard(g))
     })

   }catch(e){

     grid.innerHTML =
       "<p>Live feed unavailable — using previous snapshot.</p>"

   }
 }

 load()

 // refresh every 60 seconds
 setInterval(load,60000)

 return container
}