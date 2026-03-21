export async function login(email,password){

 await new Promise(r=>setTimeout(r,400))

 if(email === "admin" && password === "admin"){
   localStorage.token = "quant_token_admin"
   return true
 }

 throw new Error("Invalid credentials")
}