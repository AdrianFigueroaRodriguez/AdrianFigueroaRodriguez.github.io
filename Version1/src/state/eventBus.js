
const bus = {}

export const on = (e,fn)=>{
 bus[e] = bus[e] || []
 bus[e].push(fn)
}

export const emit = (e,data)=>{
 bus[e]?.forEach(f=>f(data))
}
