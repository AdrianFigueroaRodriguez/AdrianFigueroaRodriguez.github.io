function mostrarContenidoA() {
	document.getElementById("bobj1").value = "Cuadrado";
	document.getElementById("bobj1").style.backgroundImage = "url('fCuadrado.jpg')";
	document.getElementById("bobj2").value = "Circulo";
	document.getElementById("bobj2").style.backgroundImage = "url('fCirculo.jpg')";
	document.getElementById("bobj3").value = "Triangulo";
	document.getElementById("bobj3").style.backgroundImage = "url('fTriangulo.jpg')";
	document.getElementById("bobj4").value = "Rectangulo";
	document.getElementById("bobj4").style.backgroundImage = "url('fRectangulo.jpg')";
	document.getElementById("bobj5").value = "Rombo";
	document.getElementById("bobj5").style.backgroundImage = "url('fRombo.jpg')";
	document.getElementById("bobj6").value = "Romboide";
	document.getElementById("bobj6").style.backgroundImage = "url('fRomboide.jpg')";
	document.getElementById("bobj7").value = "Trapecio";
	document.getElementById("bobj7").style.backgroundImage = "url('fTrapecio.jpg')";
	document.getElementById("bobj8").value = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").value = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}

function mostrarContenidoP() {
	document.getElementById("bobj1").value = "Cuadrado";
	document.getElementById("bobj1").style.backgroundImage = "url('fCuadrado.jpg')";
	document.getElementById("bobj2").value = "Triangulo";
	document.getElementById("bobj2").style.backgroundImage = "url('fTriangulo.jpg')";
	document.getElementById("bobj3").value = "Rectangulo";
	document.getElementById("bobj3").style.backgroundImage = "url('fRectangulo.jpg')";
	document.getElementById("bobj4").value = "Rombo";
	document.getElementById("bobj4").style.backgroundImage = "url('fRombo.jpg')";
	document.getElementById("bobj5").value = "Romboide";
	document.getElementById("bobj5").style.backgroundImage = "url('fRomboide.jpg')";
	document.getElementById("bobj6").value = "Trapecio";
	document.getElementById("bobj6").style.backgroundImage = "url('fTrapecio.jpg')";
	document.getElementById("bobj7").value = " ";
	document.getElementById("bobj7").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj8").value = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").value = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}


function mostrarContenidoV() {
	document.getElementById("bobj1").value = "Cubo";
	document.getElementById("bobj1").style.backgroundImage = "url('fCubo.jpg')";
	document.getElementById("bobj2").value = "Prisma";
	document.getElementById("bobj2").style.backgroundImage = "url('fPrisma.jpg')";
	document.getElementById("bobj3").value = "Piramide";
	document.getElementById("bobj3").style.backgroundImage = "url('fPiramide.jpg')";
	document.getElementById("bobj4").value = "Cilindro";
	document.getElementById("bobj4").style.backgroundImage = "url('fCilindro.jpg')";
	document.getElementById("bobj5").value = "Cono";
	document.getElementById("bobj5").style.backgroundImage = "url('fCono.jpg')";
	document.getElementById("bobj6").value = "Esfera";
	document.getElementById("bobj6").style.backgroundImage = "url('fEsfera.jpg')";
	document.getElementById("bobj7").value = " ";
	document.getElementById("bobj7").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj8").value = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").value = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}

function limpiar(){
	document.getElementById("opc1").value = "";
	document.getElementById("tb1").value = "";
	document.getElementById("tb2").value = "";
	document.getElementById("tb3").value = "";
	document.getElementById("resultado").value = " ";
}

function comando(id){
	if(id === 1 ){
		var x1 = document.getElementById("bobj1").value;
		document.getElementById("opc1").value = x1;	
	}else if(id === 2){
		var x2 = document.getElementById("bobj2").value;
		document.getElementById("opc1").value = x2;
	}else if(id === 3){
		var x3 = document.getElementById("bobj3").value;
		document.getElementById("opc1").value = x3;
	}else if(id === 4){
		var x4 = document.getElementById("bobj4").value;
		document.getElementById("opc1").value = x4;
	}else if(id === 5){
		var x5 = document.getElementById("bobj5").value;
		document.getElementById("opc1").value = x5;
	}else if(id === 6){
		var x6 = document.getElementById("bobj6").value;
		document.getElementById("opc1").value = x6;
	}else if(id === 7){
		var x7 = document.getElementById("bobj7").value;
		document.getElementById("opc1").value = x7;
	}else if(id === 8){
		var x8 = document.getElementById("bobj8").value;
		document.getElementById("opc1").value = x8;
	}else {
		var x9 = document.getElementById("bobj9").value;
		document.getElementById("opc1").value = x9;
	}
}

function vista(id){
	if(id == 1){
		var x1 = document.getElementById("bobj1").value;
		document.getElementById("opc1").value = x1;

		if( x1 === "Cuadrado"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else if (x1 === "Cubo") { 
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}
	}else if(id == 2){
		var x2 = document.getElementById("bobj2").value;
		document.getElementById("opc1").value = x2;

		if(x2 === "Circulo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x2.style.display = "none";
				x3.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else if(x2 === "Triangulo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else{
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}else{
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}
		}
	}else if(id == 3){
		var x3 = document.getElementById("bobj3").value;
		document.getElementById("opc1").value = x3;

		if(x3 === "Triangulo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else if(x3 === "Rectangulo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}			
		}else{
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}else{
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}
		}

	}else if(id == 4){
		var x4 = document.getElementById("bobj4").value;
		document.getElementById("opc1").value = x4;
		if(x4 === "Rectangulo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else if(x4 === "Rombo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else {
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}
	}else if(id == 5){
		var x5 = document.getElementById("bobj5").value;
		document.getElementById("opc1").value = x5;
		if(x5 === "Rombo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";			
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else if(x5 === "Romboide"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}else{
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}
	}else if(id == 6){
		var x6 = document.getElementById("bobj6").value;
		document.getElementById("opc1").value = x6;
		if(x6 === "Romboide"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";				
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";	
			}
		}else if(x6 === "Trapecio"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}
		}else{
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}
	}else if(id == 7){
		var x7 = document.getElementById("bobj7").value;
		document.getElementById("opc1").value = x7;

		if(x7 === "Trapecio"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}else{
				x.style.display = "block";
				x3.style.display = "block";
				x2.style.display = "block";
				x5.style.display = "block";
				x6.style.display = "block";
			}
		}else{
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "none";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "none";
				x3.style.display = "none";
				x2.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}
	}else if(id == 8){
		var x = document.getElementById("tb1");
		var x2 = document.getElementById("tb2");
		var x3 = document.getElementById("sperator1");
		var x5 = document.getElementById("sperator2");
		var x6 = document.getElementById("tb3");

		if( x.style.display === "none"){
			x.style.display = "none";
			x3.style.display = "none";
			x2.style.display = "none";
			x5.style.display = "none";
			x6.style.display = "none";
		}else{
			x.style.display = "none";
			x3.style.display = "none";
			x2.style.display = "none";
			x5.style.display = "none";
			x6.style.display = "none";
		}
	}else if(id == 9){
		var x = document.getElementById("tb1");
		var x2 = document.getElementById("tb2");
		var x3 = document.getElementById("sperator1");
		var x5 = document.getElementById("sperator2");
		var x6 = document.getElementById("tb3");

		if( x.style.display === "none"){
			x.style.display = "none";
			x3.style.display = "none";
			x2.style.display = "none";
			x5.style.display = "none";
			x6.style.display = "none";
		}else{
			x.style.display = "none";
			x3.style.display = "none";
			x2.style.display = "none";
			x5.style.display = "none";
			x6.style.display = "none";
		}
	}	
}

function calculate(){
	var x = parse


/*
	limpio antes los cuadros
	la persona debio haber sececcionado un figuara
	mete los datos
	dependiendo de que es lo que va hacer se hace el cacluclo a su forma
	manda el resultado al ultimo lado del cambio te input.
*/

}

