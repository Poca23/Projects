// //////////////////////////////////////
// IMC
// //////////////////////////////////////
function calculDeLimc() {
  let masse = inputMasse.value;
  let taille = inputTaille.value;
  let imc = Math.round(masse / (taille * taille));

  resultats.innerHTML = "L'IMC calculé est égal à " + imc + " Kg/m²";

  if (imc > 30) {
    interpretation.innerHTML = "D'après l'OMS,  tu es dans le brin mon pote 😱";
  } else if (imc > 25) {
    interpretation.innerHTML =
      "D'après l'OMS,  vive la salle de sport et les salades à gogo 😅";
  } else if (imc >= 20) {
    interpretation.innerHTML = "D'après l'OMS,  RAS, GG, continue comme ça 🥳";
  } else if (imc > 18) {
    interpretation.innerHTML =
      "D'après l'OMS,  ça va, mais pas moins wesh, tu veux pas être une brindille non plus 😉";
  } else if (imc > 17) {
    interpretation.innerHTML =
      "D'après l'OMS,  une bonne cuisse de poulet te ferait pas du mal 🙂";
  } else {
    interpretation.innerHTML =
      "Heu ... c'est ton ombre ou c'est toi que je vois ? 🤐";
  }
}
