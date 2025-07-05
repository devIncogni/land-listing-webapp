const headerHamburger = document.querySelector(".hamburger-menu");
const wrapper = document.querySelector(".wrapper");

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
  } else if (wrapper.scrollTop < 100) {
    addHeaderTransparency();
  }
}

function toggleHamburgerCross() {
  document.querySelector(".hamburger").classList.toggle("cross");
}

headerHamburger.addEventListener("click", () => {
  toggleExtendedNavMenu();
  toggleHamburgerCross();
});

wrapper.addEventListener(`scroll`, () => {
  const extendedMenu = document.querySelector(".extended-menu");
  if (wrapper.scrollTop < 100 && !extendedMenu.classList.contains("expanded")) {
    addHeaderTransparency();
  } else {
    removeHeaderTransparency();
  }
});
// toggleExtendedNavMenu();
