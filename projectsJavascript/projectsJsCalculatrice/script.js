// Etudier un évènement qui a lieu : keydown
// C'est un évènement qui se produit dès qu'on appuie sur une touche
// Chaque touche possède une keyCode
// aller sur le site : https://www.toptal.com/developers/keycode
// pour obtenir la liste le keycode javaScript de n'importe quelle touche
// utile pour ceux qui ont un pavé numérique.

// Etudier un autre évènement : sur les boutons on ajoutera l'attribut "data-key"
// Pour chaque bouton on associera un numéro qui correspondra au keyCode
// de la touche qu'on aimerait utiliser sur le clavier.
// Les attributs data servent à attacher une valeur à un élément html
// On peut y accéder en JavaScript avec l'élément "element.dataset.nomDuDataset"

// Pour récupérer les éléments du DOM
const touches = [...document.querySelectorAll(".bouton")];
// map est une fonction javaScript qui va nous permettre de prendre chaque élément du tableau
// et de leurs faire quelque chose dans une fonction callback. Ce qui retourne le résultat sous
// la forme d'un nouveau tableau
/*
Exemple :
const tableau = [3, 5, 11];
const nouveauTableau = tableau.map((element) => element * 2);
console.log(tableau);
console.log(nouveauTableau);
*/

const listeKeycode = touches.map((touche) => touche.dataset.key);
const ecran = document.querySelector(".ecran");
// Deuxième évènement : le click event
// On voudra qu'il y est un évènement qui se déclache et
// qu'il fasse quelque chose avec les touches
// Que ce soit pour le premier ou le deuxième évènement,
// on aimerait qu'il y est un chiffre qui s'affiche sur l'écran de la calculatrice.
// On codera ces deux évènements :

// document.addEventListener("keydown", (e) => console.log(e));
// Dès qu'on appuiera sur une touche l'évènement sera affiché sur la console
// On aimaerait récupérer la valeur de ce keycode,
// on écrira une fonction à la place de cet évènement
document.addEventListener("keydown", (e) => {
  const valeur = e.keyCode.toString();
  calculer(valeur);
});

// On va créer le deuxième évènement :
document.addEventListener("click", (e) => {
  const valeur = e.target.dataset.key;
  calculer(valeur);
});

// On va travailler sur la fonction calcul :
// C'est une fonction quib va récupérer le keycode sur laquelle
// on a soit appuyer avec le clavier, soit on a cliqué avec la souris
// Sin on appuie sur une des touches qui ne fait pas
// partie de la calculatrice, il ne doit rien se faire,
// on élimine toutes les interactions avec une autre touche du clavier
// On va vérifier si notre liste de keycode récupérée contient
// la valeur du keycode qui sera passée en paramètre ci - dessous
const calculer = (valeur) => {
  if (listeKeycode.includes(valeur)) {
    console.log(listeKeycode);
    switch (valeur) {
      case "8":
        ecran.textContent = "";
      case "13":
        const calcul = eval(ecran.textContent);
        ecran.textContent = calcul;
        break;
      default:
        const indexKeycode = listeKeycode.indexOf(valeur);
        const touche = touches[indexKeycode];
        ecran.textContent += touche.innerHTML;
    }
  }
};

// La méthode includes() :
/* 
Exemple :*/
// const animaux = ["chat", "chien", "cheval"];
// console.log(animaux.includes("chienne")); //false
// console.log(animaux.includes("chat")); //true

// La gestion des erreurs :
// On va utiliser l'évènement error pour prévenir l'utilisateur
window.addEventListener("error", (e) => {
  alert("Retourne à l'école corniaud ! " + " --- " + e.message) + ")";
});
