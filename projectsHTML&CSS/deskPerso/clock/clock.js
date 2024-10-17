//  CLOCK
// -----------------------------------------------

// alert("deuxchiffres(12)");
// alert(deuxchiffres(7));
// -----------------------------------------------
// variable deuxchiffres et sa fonction :
function deuxChiffres(element) {
  if (element < 10) {
    return (element = "0" + element);
  } else {
    return element;
  }
}
// class/objet de type Date
var currentDate = new Date();
// -----------------------------------------------
// variable heure :
var heures = deuxChiffres(currentDate.getHours());
// -----------------------------------------------
// variable minute :
var minutes = deuxChiffres(currentDate.getMinutes());
// -----------------------------------------------
// variable seconde :
var secondes = deuxChiffres(currentDate.getSeconds());
// -----------------------------------------------
// variable horloge :
var horloge = heures + ":" + minutes + ":" + secondes;
alert(horloge);
// -----------------------------------------------
// fonction pour lancer l'affichage de l'heure générale toutes les secondes, donc, toutes les 1000 ms :
var affichageHeure = setTimeout(horloge, 1000);
// -----------------------------------------------
// lancer la fonction au début :
function affichageHeure() {
  setTimeout(horloge, 1000);
}
