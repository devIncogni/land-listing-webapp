function toggleExtendedNavMenu() {
  const extendedMenu = document.querySelector(".extended-menu");

  extendedMenu.classList.toggle("hidden");
}

const headerHamburger = document.querySelector(".hamburger-menu");

headerHamburger.addEventListener("click", toggleExtendedNavMenu);

// toggleExtendedNavMenu();
