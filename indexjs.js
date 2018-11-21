function mostrarContenidoA() {
	document.getElementById("bobj1").value = "Area \nCuadrado";
	document.getElementById("bobj1").style.backgroundImage = "url('fCuadrado.jpg')";
	document.getElementById("bobj2").value = "Area \nCirculo";
	document.getElementById("bobj2").style.backgroundImage = "url('fCirculo.jpg')";
	document.getElementById("bobj3").value = "Area \nTriangulo";
	document.getElementById("bobj3").style.backgroundImage = "url('fTriangulo.jpg')";
	document.getElementById("bobj4").value = "Area \nRectangulo";
	document.getElementById("bobj4").style.backgroundImage = "url('fRectangulo.jpg')";
	document.getElementById("bobj5").value = "Area \nRombo";
	document.getElementById("bobj5").style.backgroundImage = "url('fRombo.jpg')";
	document.getElementById("bobj6").value = "Area \nRomboide";
	document.getElementById("bobj6").style.backgroundImage = "url('fRomboide.jpg')";
	document.getElementById("bobj7").value = "Area \nTrapecio";
	document.getElementById("bobj7").style.backgroundImage = "url('fTrapecio.jpg')";
	document.getElementById("bobj8").value = " ";
	document.getElementById("bobj8").style.backgroundImage = "url('blank.jpg')";
	document.getElementById("bobj9").value = " ";
	document.getElementById("bobj9").style.backgroundImage = "url('blank.jpg')";
}

function mostrarContenidoP() {
	document.getElementById("bobj1").value = "Perimetro \nCuadrado";
	document.getElementById("bobj1").style.backgroundImage = "url('fCuadrado.jpg')";
	document.getElementById("bobj2").value = "Perimetro \nTriangulo";
	document.getElementById("bobj2").style.backgroundImage = "url('fTriangulo.jpg')";
	document.getElementById("bobj3").value = "Perimetro \nRectangulo";
	document.getElementById("bobj3").style.backgroundImage = "url('fRectangulo.jpg')";
	document.getElementById("bobj4").value = "Perimetro \nRombo";
	document.getElementById("bobj4").style.backgroundImage = "url('fRombo.jpg')";
	document.getElementById("bobj5").value = "Perimetro \nRomboide";
	document.getElementById("bobj5").style.backgroundImage = "url('fRomboide.jpg')";
	document.getElementById("bobj6").value = "Perimetro \nTrapecio";
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

		if( x1 === "Area \nCuadrado"){
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
		}else if (x1 === "Perimetro \nCuadrado") { 
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

		if(x2 === "Area \nCirculo"){
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
		}else if(x2 === "Perimetro \nTriangulo"){
			var x = document.getElementById("tb1");
			var x2 = document.getElementById("tb2");
			var x3 = document.getElementById("sperator1");
			var x5 = document.getElementById("sperator2");
			var x6 = document.getElementById("tb3");

			if( x.style.display === "none"){
				x.style.display = "block";
				x2.style.display = "none";
				x3.style.display = "none";
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x2.style.display = "none";
				x3.style.display = "none";
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

		if(x3 === "Area \nTriangulo"){
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
		}else if(x3 === "Perimetro \nRectangulo"){
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
				x5.style.display = "none";
				x6.style.display = "none";
			}else{
				x.style.display = "block";
				x2.style.display = "block";
				x3.style.display = "block";
				x5.style.display = "none";
				x6.style.display = "none";
			}
		}

	}else if(id == 4){
		var x4 = document.getElementById("bobj4").value;
		document.getElementById("opc1").value = x4;
		if(x4 === "Area \nRectangulo"){
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
		}else if(x4 === "Perimetro \nRombo"){
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
		if(x5 === "Area \nRombo"){
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
		}else if(x5 === "Perimetro \nRomboide"){
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
		if(x6 === "Area \nRomboide"){
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
		}else if(x6 === "Perimetro \nTrapecio"){
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

		if(x7 === "Area \nTrapecio"){
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

function calculate(tipo){

	if(tipo === "Area \nCuadrado"){

		var dato =  parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = dato*dato;
		document.getElementById("tb1").value = "";

	}else if(tipo === "Area \nCirculo"){

		var dato2 = parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = (3.14 * (dato2*dato2));
		document.getElementById("tb1").value = "";

	}else if(tipo === "Area \nTriangulo"){

		var dato3 = parseFloat(document.getElementById("tb1").value);
		var dato4 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = ((dato3*dato4)/2);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";

	}else if(tipo === "Area \nRectangulo"){

		var dato5 = parseFloat(document.getElementById("tb1").value);
		var dato6 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = (dato5*dato6);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		
	}else if(tipo === "Area \nRombo"){

		var dato7 = parseFloat(document.getElementById("tb1").value);
		var dato8 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = ((dato7*dato8)/2);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";

	}else if(tipo === "Area \nRomboide"){

		var dato7 = parseFloat(document.getElementById("tb1").value);
		var dato8 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = (dato7*dato8);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		
	}else if(tipo === "Area \nTrapecio"){

		var dato9 = parseFloat(document.getElementById("tb1").value);
		var dato10 = parseFloat(document.getElementById("tb2").value);
		var dato11 = parseFloat(document.getElementById("tb3").value);
		document.getElementById("resultado").value = (dato9 * ((dato10+dato11)/2));
		document.getElementById("tb1").value = "" ;
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";

	}else if(tipo === "Perimetro \nCuadrado"){

		var dato12 = parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = (dato12*4);
		document.getElementById("tb1").value = "" ;
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Perimetro \nTriangulo"){

		var dato13 = parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = (dato13 *3);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Perimetro \nRectangulo"){

		var dato14 = parseFloat(document.getElementById("tb1").value);
		var dato15 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = ((dato14 + dato15)*2);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Perimetro \nRombo"){

		var dato16 = parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = (dato16*4);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Perimetro \nRomboide"){

		var dato17 = parseFloat(document.getElementById("tb1").value);
		var dato18 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = ((dato17+dato18) *2);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Perimetro \nTrapecio"){

		var dato19 = parseFloat(document.getElementById("tb1").value);
		var dato20 = parseFloat(document.getElementById("tb2").value);
		var dato21 = parseFloat(document.getElementById("tb3").value);
		document.getElementById("resultado").value = ((2*dato19)+dato20+dato21);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Cubo"){

		var dato22 = parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = (dato22*dato22*dato22);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";

	}else if(tipo === "Prisma"){

		var dato23 = parseFloat(document.getElementById("tb1").value);
		var dato24 = parseFloat(document.getElementById("tb2").value);
		var dato25 = parseFloat(document.getElementById("tb3").value);
		document.getElementById("resultado").value = (dato23*dato24*dato25);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Piramide"){

		var dato26 = parseFloat(document.getElementById("tb1").value);
		var dato27 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = ((dato26*dato27)/3);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Cilindro"){

		var dato28 = parseFloat(document.getElementById("tb1").value);
		var dato29 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = (daot28*dato29);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else if(tipo === "Cono"){

		var dato30 = parseFloat(document.getElementById("tb1").value);
		var dato31 = parseFloat(document.getElementById("tb2").value);
		document.getElementById("resultado").value = ((dato30*dato31)/3);
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";
		
	}else{

		var dato32 = parseFloat(document.getElementById("tb1").value);
		document.getElementById("resultado").value = (((dato32*dato32*dato32)*3.14)*4)/3;
		document.getElementById("tb1").value = "";
		document.getElementById("tb2").value = "";
		document.getElementById("tb3").value = "";


	}

/*
	limpio antes los cuadros
	la persona debio haber sececcionado un figuara
	mete los datos
	dependiendo de que es lo que va hacer se hace el cacluclo a su forma
	manda el resultado al ultimo lado del cambio te input.
*/

}

