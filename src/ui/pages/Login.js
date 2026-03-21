import { login } from "../../api/authApi.js"

export default function Login(){

 const div = document.createElement("div")

 div.innerHTML = `
   <div class="login-container">
     <div class="login-card">
       <div class="login-header">
         <h1>QuantEdge</h1>
         <p class="tagline">Trade Like an Insider</p>
         <p class="subtitle">Quantitative Market Intelligence Platform</p>
       </div>

       <div class="value-props">
         <div class="prop-item">
           <span class="prop-icon">📊</span>
           <span>Live Insider Trading Data</span>
         </div>
         <div class="prop-item">
           <span class="prop-icon">🏛️</span>
           <span>Congressional Trade Tracking</span>
         </div>
         <div class="prop-item">
           <span class="prop-icon">📈</span>
           <span>Institutional Holdings</span>
         </div>
       </div>

       <form class="login-form">
         <div class="form-group">
           <label for="email">Professional Email</label>
           <input id="email" type="email" placeholder="trader@firm.com" class="form-input"/>
         </div>

         <div class="form-group">
           <label for="emKey">Access Code</label>
           <input id="emKey" placeholder="Enter secure password" type="password" class="form-input"/>
         </div>

         <button type="button" class="login-btn">Access Platform</button>

         <p class="error"></p>
       </form>

       <div class="trust-indicators">
         <p class="trust-text">Data Trusted By Industry Leaders</p>
         <div class="trust-logos">
           <span class="logo-placeholder">CNBC</span>
           <span class="logo-placeholder">Bloomberg</span>
           <span class="logo-placeholder">Reuters</span>
         </div>
       </div>

       <div class="login-footer">
         <p>Demo Access: admin / admin</p>
         <p class="disclaimer">For professional quantitative traders and analysts</p>
       </div>
     </div>
   </div>
 `

 div.querySelector(".login-btn").onclick = async ()=>{

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