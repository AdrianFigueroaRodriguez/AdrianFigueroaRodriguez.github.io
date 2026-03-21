
self.onmessage = (e)=>{

 const { spread, iterations } = e.data

 let covers = 0

 for(let i=0;i<iterations;i++){
   const sim = spread + randn()*12
   if(sim>0) covers++
 }

 self.postMessage({ prob:covers/iterations })
}

function randn(){
 let u=0,v=0
 while(u===0)u=Math.random()
 while(v===0)v=Math.random()
 return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)
}
