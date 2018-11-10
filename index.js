function mostrarContenidoA() {
	document.getElementById("DropDownMenuA").classList.toggle("show");
}

function mostrarContenidoP() {
	document.getElementById("DropDownMenuP").classList.toggle("show");
}

function mostrarContenidoV() {
	document.getElementById("DropDownMenuV").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.DropDownBtnA') &&
	  !e.target.matches('.DropDownBtnP') &&
	  !e.target.matches('.DropDownBtnV')) {
	    var myDropdownA = document.getElementById("DropDownMenuA");
		var myDropdownP = document.getElementById("DropDownMenuP");
		var myDropdownV = document.getElementById("DropDownMenuV");
	      if (myDropdownA.classList.contains('show')) {
	      	myDropdownA.classList.remove('show');
	      } else if(myDropdownP.classList.contains('show')){
	      	myDropdownP.classList.remove('show');
	      } else{
	      	myDropdownV.classList.remove('show');
	      }
  }
}