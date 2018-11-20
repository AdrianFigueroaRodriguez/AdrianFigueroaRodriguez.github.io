function mostrarContenidoA() {
	document.getElementById("bobj1").innerHTML = "Cuadrado";
	document.getElementById("bobj1").style.backgroundImage = "url('fCuadrado.jpg')";
	document.getElementById("bobj2").innerHTML = "Circulo";
	document.getElementById("bobj2").style.backgroundImage = "url('fCirculo.jpg')";
	document.getElementById("bobj3").innerHTML = "Triangulo";
	document.getElementById("bobj3").style.backgroundImage = "url('fTriangulo.jpg')";
	document.getElementById("bobj4").innerHTML = "Rectangulo";
	document.getElementById("bobj4").style.backgroundImage = "url('fRectangulo.jpg')";
	document.getElementById("bobj5").innerHTML = "Rombo";
	document.getElementById("bobj5").style.backgroundImage = "url('fRombo.jpg')";
	document.getElementById("bobj6").innerHTML = "Romboide";
	document.getElementById("bobj6").style.backgroundImage = "url('fRomboide.jpg')";
	document.getElementById("bobj7").innerHTML = "Trapecio";
	document.getElementById("bobj7").style.backgroundImage = "url('fTrapecio.jpg')";
	document.getElementById("bobj8").innerHTML = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").innerHTML = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}

function mostrarContenidoP() {
	document.getElementById("bobj1").innerHTML = "Cuadrado";
	document.getElementById("bobj1").style.backgroundImage = "url('fCuadrado.jpg')";
	document.getElementById("bobj2").innerHTML = "Triangulo";
	document.getElementById("bobj2").style.backgroundImage = "url('fTriangulo.jpg')";
	document.getElementById("bobj3").innerHTML = "Rectangulo";
	document.getElementById("bobj3").style.backgroundImage = "url('fRectangulo.jpg')";
	document.getElementById("bobj4").innerHTML = "Rombo";
	document.getElementById("bobj4").style.backgroundImage = "url('fRombo.jpg')";
	document.getElementById("bobj5").innerHTML = "Romboide";
	document.getElementById("bobj5").style.backgroundImage = "url('fRomboide.jpg')";
	document.getElementById("bobj6").innerHTML = "Trapecio";
	document.getElementById("bobj6").style.backgroundImage = "url('fTrapecio.jpg')";
	document.getElementById("bobj7").innerHTML = " ";
	document.getElementById("bobj7").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj8").innerHTML = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").innerHTML = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}


function mostrarContenidoV() {
	document.getElementById("bobj1").innerHTML = "Cubo";
	document.getElementById("bobj1").style.backgroundImage = "url('fCubo.jpg')";
	document.getElementById("bobj2").innerHTML = "Prisma";
	document.getElementById("bobj2").style.backgroundImage = "url('fPrisma.jpg')";
	document.getElementById("bobj3").innerHTML = "Piramide";
	document.getElementById("bobj3").style.backgroundImage = "url('fPiramide.jpg')";
	document.getElementById("bobj4").innerHTML = "Cilindro";
	document.getElementById("bobj4").style.backgroundImage = "url('fCilindro.jpg')";
	document.getElementById("bobj5").innerHTML = "Cono";
	document.getElementById("bobj5").style.backgroundImage = "url('fCono.jpg')";
	document.getElementById("bobj6").innerHTML = "Esfera";
	document.getElementById("bobj6").style.backgroundImage = "url('fEsfera.jpg')";
	document.getElementById("bobj7").innerHTML = " ";
	document.getElementById("bobj7").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj8").innerHTML = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").innerHTML = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}

window.onclick = function(e) {
  if (!e.target.matches('.DropDownBtnA') && !e.target.matches('.DropDownBtnP') && !e.target.matches('.DropDownBtnV')) {
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













