
export async function getOdds(){
 const res = await fetch("src/data/mockOdds.json")
 return res.json()
}
