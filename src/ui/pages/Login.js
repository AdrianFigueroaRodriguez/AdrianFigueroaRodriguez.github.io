import { login } from "../../api/authApi.js"

export default function Login(){

 const div = document.createElement("div")

 div.innerHTML = `
   <div class="login-container">
     <div class="login-card">
       <div class="login-header">
         <h1>Market Quant Ai</h1>
         <p class="tagline">Trade smarter / more like a PRO / better than an investor</p>
         <p class="subtitle">Market Quantitative Artifical Intelligence </p>
         <p class="subtitle">Focus your Inteligence, make Real Emotions</p>
       </div>

       <div class="value-props">
         <div class="prop-item">
           <span class="prop-icon">📊</span>
           <span>Live NBA Data</span>
         </div>
         <div class="prop-item">
           <span class="prop-icon">🏛️</span>
           <span>NBA seasonal Tracking</span>
         </div>
         <div class="prop-item">
           <span class="prop-icon">📈</span>
           <span>Institutional AI asistance</span>
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
         <p class="trust-text">Real Data, Trusted by leaders like you</p>
         <div class="trust-logos">
          <span class="logo-placeholder">MQai Team, memebers and afiliates</span>
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