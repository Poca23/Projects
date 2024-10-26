// //////////////////////////////////////
// Jeu de tir
// //////////////////////////////////////

let container = document.querySelector(" .container");
let btn = document.querySelector(" .start_btn");
let scoreContainer = document.querySelector(" .score");
let timeContainer = document.querySelector(" .time");

btn.onclick = function () {
  let score = 0;
  let time = 20;
  container.innerHTML = "";

  let interval = setInterval(function showTarget() {
    // creation de la cible
    let target = document.createElement("img");
    target.id = "target";
    target.src = "lapinMechant.png";
    container.appendChild(target);
    target.style.top = Math.random() * (300 - target.offsetHeight) + "px";
    target.style.left = Math.random() * (500 - target.offsetWidth) + "px";

    // faire disparaitre la cible
    setTimeout(function () {
      target.remove();
    }, 1000);

    //   Clique sur target
    target.onclick = function () {
      score += 1;
      target.style.display = "none";
    };
    time -= 1;

    //   Afficher les infos
    scoreContainer.innerHTML = `Score : ${score} `;
    timeContainer.innerHTML = `Temps : ${time} `;

    //   Fin du jeu quand le temps est écoulé
    if (time == 0) {
      clearInterval(interval);
      container.innerHTML = "Fini ! Alors, ça donne quoi champion ?";
    }
  }, 1800);
};
