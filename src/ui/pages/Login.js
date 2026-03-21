import { login } from "../../api/authApi.js"

export default function Login(){

 const div = document.createElement("div")

 div.innerHTML = `
   <h2>QuantEdge Login</h2>
   <input id="email" placeholder="email@company.com"/>
   <input id="emKey" placeholder="p@s5w0Rd" type="password"/>
   <button>Login</button>
   <p class="error"></p>
 `

 div.querySelector("button").onclick = async ()=>{

   const email = div.querySelector("#email").value
   const emKey = div.querySelector("#emKey").value

   try{
     await login(email,emKey)
     window.location="/"
   }catch(e){
     div.querySelector(".error").innerText = e.message
   }

 }

 return div
}