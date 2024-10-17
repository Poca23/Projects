Array.from(document.querySelectorAll(".boîte-onglet")).forEach(
  (tab_container, TabID) => {
    const registers = tab_container.querySelector(".onglet");
    const bodies = tab_container.querySelector(".content");

    Array.from(registers.children).forEach((el, i) => {
      el.setAttribute("aria-controls", `${TabID}_${i}`);
      bodies.children[i]?.setAttribute("id", `${TabID}_${i}`);

      el.addEventListener("click", (ev) => {
        let activeRegister = registers.querySelector(".active");
        activeRegister.classList.remove("active");
        activeRegister = el;
        activeRegister.classList.add("active");
        changeBody(registers, bodies, activeRegister);
      });
    });
  }
);

function changeBody(registers, bodies, activeRegister) {
  Array.from(registers.children).forEach((el, i) => {
    if (bodies.children[i]) {
      bodies.children[i].style.display =
        el == activeRegister ? "block" : "none";
    }

    el.setAttribute("aria-expanded", el == activeRegister ? "true" : "false");
  });
}
