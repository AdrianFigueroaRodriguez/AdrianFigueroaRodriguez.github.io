export async function getLiveGames(){

 const url =
 "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"

 const res = await fetch(url)
 const data = await res.json()

 return data.scoreboard.games.map(g=>({

   home: g.homeTeam.teamTricode,
   away: g.awayTeam.teamTricode,

   // synthetic spread model from score differential
   spread:
      (g.homeTeam.score - g.awayTeam.score) || 
      (Math.random()*8-4).toFixed(1),

   total:
      (g.homeTeam.score + g.awayTeam.score) || 
      220 + Math.floor(Math.random()*15),

   book: "MarketFeed",

   status: g.gameStatusText

 }))
}