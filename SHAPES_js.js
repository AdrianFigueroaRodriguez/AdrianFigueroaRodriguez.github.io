function mostrarContenidoA() {
	document.getElementById("DropDownMenuA").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.DropDownBtnA')) {
    var myDropdownA = document.getElementById("DropDownMenuA");
      if (myDropdownA.classList.contains('show')) {
        myDropdownA.classList.remove('show');
      }
  }
}

function mostrarContenidoP() {
	document.getElementById("DropDownMenuP").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.DropDownBtnP')) {
    var myDropdownP = document.getElementById("DropDownMenuP");
      if (myDropdownP.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
  }
}

function mostrarContenidoV() {
	document.getElementById("DropDownMenuV").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.DropDownBtnV')) {
    var myDropdownV = document.getElementById("DropDownMenuV");
      if (myDropdownV.classList.contains('show')) {
        myDropdownV.classList.remove('show');
      }
  }
}