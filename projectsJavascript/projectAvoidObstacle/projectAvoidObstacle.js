// projectAvoidObstacle

let perso = document.querySelector(".perso");
let obstacles = document.querySelector(".obstacles");

function sauter() {
  // function pour faire sauter le personnage
  //   alert("Vous avez cliquez sur le bouton");
  if (perso.classList != "animation") {
    perso.classList.add("animation");
  }
  setTimeout(function () {
    perso;
    classList.remove("animation");
  }, 500);
}

// vérifier si l'obstacle touche le personnage

let verification = setInterval(function () {
  let persoTop = parseInt(
    window.getComputedStyle(dino).getPropertyValue("top")
  );
  let obstaclesLeft = parseInt(
    window.getComputedStyle(obstacles).getPropertyValue("left")
  );

  if (obstaclesLeft < 20 && obstaclesLeft > 0 && persoTop >= 30) {
    obstacles.style.animation = "none";
    alert("Dommage, essaye encore :) ");
  }
}, 1);
