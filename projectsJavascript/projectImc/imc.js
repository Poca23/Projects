// //////////////////////////////////////
// IMC
// //////////////////////////////////////
function calculDeLimc() {
  let masse = inputMasse.value;
  let taille = inputTaille.value;
  let imc = Math.round(masse / (taille * taille));

  resultats.innerHTML = "L'IMC calculé est égal à " + imc + " Kg/m²";

  if (imc > 30) {
    interpretation.innerHTML = "D'après l'OMS,  l'individu souffre d'obésité.";
  } else if (imc > 25) {
    interpretation.innerHTML =
      "D'après l'OMS,  l'individu souffre de surpoids.";
  } else if (imc > 20) {
    interpretation.innerHTML = "D'après l'OMS,  RAS, GG, continue comme ça.";
  } else {
    interpretation.innerHTML =
      "D'après l'OMS,  ça va, mais pas moins wesh, tu veux pas être une brindille non plus.";
  }
}
