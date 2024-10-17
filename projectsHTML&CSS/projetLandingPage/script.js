const hamburgerButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

hamburgerButton.addEventListener("click", toggleNav);

function toggleNav() {
  hamburgerButton.classList.toggle("active");
  navigation.classList.toggle("active");
  navLinks.classList.toggle("active");
}
