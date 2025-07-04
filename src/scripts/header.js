function addHeaderTransparency() {
  document
    .querySelector(".header-extended-menu-container")
    .classList.add("transparent-container");
}

function removeHeaderTransparency() {
  document
    .querySelector(".header-extended-menu-container")
    .classList.remove("transparent-container");
}

function toggleExtendedNavMenu() {
  const extendedMenu = document.querySelector(".extended-menu");
  extendedMenu.classList.toggle("expanded");

  if (extendedMenu.classList.contains("expanded")) {
    removeHeaderTransparency();
  } else if (window.scrollY < 100) {
    addHeaderTransparency();
  }
}

function toggleHamburgerCross() {
  document.querySelector(".hamburger").classList.toggle("cross");
}

const headerHamburger = document.querySelector(".hamburger-menu");

headerHamburger.addEventListener("click", () => {
  toggleExtendedNavMenu();
  toggleHamburgerCross();
});
document.addEventListener(`scroll`, () => {
  if (window.scrollY < 100) {
    addHeaderTransparency();
  } else {
    removeHeaderTransparency();
  }
});
// toggleExtendedNavMenu();
