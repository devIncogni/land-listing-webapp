document.addEventListener(`readystatechange`, () => {
  if (document.readyState !== "complete") {
    document.querySelector(".loader-container").classList.remove("removed");
  } else {
    document.querySelector(".loader-container").classList.add("removed");
  }
});
