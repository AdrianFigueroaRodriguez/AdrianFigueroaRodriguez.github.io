
import { router } from "./router.js"

function render(){
 const app = document.getElementById("app")
 app.innerHTML=""
 app.appendChild(router())
}

render()
