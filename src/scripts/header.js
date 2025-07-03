function toggleExtendedNavMenu() {
  const extendedMenu = document.querySelector(".extended-menu");

  extendedMenu.classList.toggle("expanded");
}

const headerHamburger = document.querySelector(".hamburger-menu");

headerHamburger.addEventListener("click", toggleExtendedNavMenu);

// toggleExtendedNavMenu();
