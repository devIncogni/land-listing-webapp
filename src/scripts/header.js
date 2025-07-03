function toggleExtendedNavMenu() {
  document.querySelector(".extended-menu").classList.toggle("expanded");
}

function toggleHamburgerCross() {
  document.querySelector(".hamburger").classList.toggle("cross");
}

function toggleHeaderTransparency() {
  if (window.scrollY < 100) {
    document
      .querySelector(".header-extended-menu-container")
      .classList.add("transparent-container");
  } else {
    document
      .querySelector(".header-extended-menu-container")
      .classList.remove("transparent-container");
  }
}

const headerHamburger = document.querySelector(".hamburger-menu");

headerHamburger.addEventListener("click", () => {
  toggleExtendedNavMenu();
  toggleHamburgerCross();
});
document.addEventListener(`scroll`, toggleHeaderTransparency);
// toggleExtendedNavMenu();
