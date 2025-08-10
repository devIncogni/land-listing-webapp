function addHeaderTransparency() {
  if (
    document
      .querySelector(".header-extended-menu-container")
      .classList.contains("never-transparent")
  ) {
    return;
  }
  document
    .querySelector(".header-extended-menu-container")
    .classList.add("transparent-container");
}

function removeHeaderTransparency() {
  if (
    document
      .querySelector(".header-extended-menu-container")
      .classList.contains("never-transparent")
  ) {
    return;
  }
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
  const extendedMenu = document.querySelector(".extended-menu");
  if (window.scrollY < 100 && !extendedMenu.classList.contains("expanded")) {
    addHeaderTransparency();
  } else {
    removeHeaderTransparency();
  }
});
// toggleExtendedNavMenu();
