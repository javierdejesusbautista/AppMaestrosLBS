Visor.Preguntas = ''
    //En estas paginas no se puede rayar
Visor.BloqueoRayar = [];

//IdLibro
Visor.idLibro=520;
//Selecciona el idioma IN=Ingles  ES=Español
Visor.Idioma="IN";

Visor.TituloEjercicios;
Visor.Excelente;
Visor.BuenTrabajo;
Visor.SeguiIntentando;

if(Visor.Idioma==="ES"){
  //Español
  	Visor.TituloEjercicios="Selecciona el número de ejercicio";
  	Visor.Excelente="Excelente";
	Visor.BuenTrabajo="Buen Trabajo";
	Visor.SeguiIntentando="Sigue Intentando";
}
else {
  	//Ingles
  	Visor.TituloEjercicios="Select the exercise number";
  	Visor.Excelente="Excellent";
	Visor.BuenTrabajo="Good job";
	Visor.SeguiIntentando="Keep trying";
}

