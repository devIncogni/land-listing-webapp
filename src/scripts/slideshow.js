import Rellax from "rellax";

const parallaxSpeed = -7;

Rellax('.hero-text');
let rellaxInstace = new Rellax(".slide-show-img.active", {
  speed: parallaxSpeed,
});
// rellaxInstace.destroy()

function slideShow() {
  const slideShowImages = [...document.querySelectorAll(".slide-show-img")];

  const numImgs = slideShowImages.length;
  // console.log(numImgs);

  for (let i = 0; i < numImgs; i += 1) {
    const currentImg = slideShowImages[i];
    const nextImg =
      i >= numImgs - 1 ? slideShowImages[0] : slideShowImages[i + 1];

    if (currentImg.classList.contains("active")) {
      currentImg.classList.remove("active");
      nextImg.classList.add("active");
      rellaxInstace.destroy();
      rellaxInstace = new Rellax(".slide-show-img.active", {
        speed: parallaxSpeed,
      });
      return;
    }
  }
}

setInterval(slideShow, 5000);
