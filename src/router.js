
import Login from "./ui/pages/Login.js"
import Dashboard from "./ui/pages/Dashboard.js"

export function router(){

 const path = window.location.pathname

 if(!localStorage.token){
   return Login()
 }

 if(path === "/" || path === "/dashboard"){
   return Dashboard()
 }

 return Login()
}
