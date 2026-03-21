
export function runSimulation(spread,cb){

 const worker = new Worker("src/workers/monteCarlo.worker.js")

 worker.postMessage({
   spread,
   iterations:20000
 })

 worker.onmessage = e=>{
   cb(e.data.prob)
 }
}
