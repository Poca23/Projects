////////////////////////////////////////////////////////////
//Application AzerType
////////////////////////////////////////////////////////////
// Déclaration de la variable contenant le choix de l'utilisateur
// let choix = prompt(
//   "Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?"
// );
// Tant que l'utilisateur n'a pas saisi "mots" ou "phrases", on lui redemande de saisir un choix
// while (choix !== "mots" && choix !== "phrases") {
//   choix = prompt(
//     "Avec quelle liste désirez-vous jouer : 'mots' ou 'phrases' ?"
//   );
// }
// // A noter : ce n'est pas la seule réponse valide pour cet exercice, il en existe d'autres plus optimisées,
// // mais nous verrons cela dans les prochains chapitres.
function afficheResultat(score, nbTotalDeMotsProposes) {
  console.log("Votre score est de " + score + " / " + nbTotalDeMotsProposes);
}

function choisirPhrasesOuMots() {
  let choix = prompt('Choisissez entre : "mots" ou "phrases"');
  while (choix !== "mots" && choix !== "phrases") {
    choix = prompt(
      "wesh, choisis te dis-je insolent(e) : 'mots' ou  'phrases' ?"
    );
  }
  return choix;
}

function lancerBoucleDeJeu(listePropositions) {
  let score = 0;
  for (let i = 0; i < listePropositions.length; i++) {
    motUtilisateur = prompt("Entrez le mot : " + listePropositions[i]);
    if (motUtilisateur === listePropositions[i]) {
      score++;
    }
  }
  return score;
}

function lancerJeu() {
  let choix = choisirPhrasesOuMots();
  let score = 0;
  let nbTotalDeMotsProposes = 0;

  if (choix === "mots") {
    score = lancerBoucleDeJeu(listeMots);
    nbTotalDeMotsProposes = listeMots.length;
  } else {
    score = lancerBoucleDeJeu(listePhrases);
    nbTotalDeMotsProposes = listePhrases.length;
  }

  afficheResultat(score, nbTotalDeMotsProposes);
}
