document.addEventListener(`readystatechange`, () => {
  if (document.readyState !== "complete") {
    document.querySelector(".loader-container").classList.remove("removed");
    document.querySelector(".wrapper").styles.display = 'none';
  } else {
    document.querySelector(".loader-container").classList.add("removed");
    document.querySelector(".wrapper").removeAttribute('style');
  }
});
