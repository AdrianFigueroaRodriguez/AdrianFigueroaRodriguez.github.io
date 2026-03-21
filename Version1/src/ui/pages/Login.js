import { login } from "../../api/authApi.js"

export default function Login(){

 const div = document.createElement("div")

 div.innerHTML = `
   <h2>QuantEdge Login</h2>
   <input id="email" placeholder="email"/>
   <input id="pass" placeholder="password" type="password"/>
   <button>Login</button>
   <p class="error"></p>
 `

 div.querySelector("button").onclick = async ()=>{

   const email = div.querySelector("#email").value
   const pass = div.querySelector("#pass").value

   try{
     await login(email,pass)
     window.location="/"
   }catch(e){
     div.querySelector(".error").innerText = e.message
   }

 }

 return div
}