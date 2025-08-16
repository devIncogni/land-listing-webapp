// CSS Imports
import "./styles/default-reset.css";
import "./styles/styles.css";
import "./styles/header-styles.css";
// import "./styles/slideshow-styles.css";
import "./styles/text-underline-animation.css";
// import "./styles/land-card-styles.css";
// import "./styles/why-choose-us.css";
// import "./styles/faq-styles.css";
import "./styles/map-styles.css";
import "./styles/plotdetails-styles.css";
import "./styles/footer.css";
import "./styles/util-styles.css";
// JS Imports
import "./scripts/header";
import "./scripts/loader";
import MapIntegration from "./scripts/map";

// import "./scripts/slideshow";
// import "./scripts/faqs";
// import plotData from "./plot-details.json";

import plotData from "./plot-details.json";
MapIntegration(plotData[0].coords.latitude, plotData[0].coords.longitude);

// fillData function
async function fillData(id) {
  const data = plotData[id];

  const parent = document.querySelector(".individual-plot-details");
  const sectionTemplate = document.querySelector(".plot-details-container");
  const priceSectionTemplate = document.querySelector(
    ".plot-details-price-container"
  );

  // Clear previous details if any
  parent.innerHTML = "";

  // Clone the template
  const cloneSection = sectionTemplate.cloneNode(true);
  const priceSectionClone = priceSectionTemplate.cloneNode(true);

  // =====================
  // IMAGES
  // =====================
  const currentImg = cloneSection.querySelector(".current-img img");
  const allImgsContainer = cloneSection.querySelector(".all-imgs");
  allImgsContainer.innerHTML = "";

  if (data.images.length > 0) {
    let currentImgSrc = await import(
      `./assets/hero-slideshow/${data.images[0]}`
    );
    currentImgSrc = currentImgSrc.default;
    currentImg.src = currentImgSrc;

    const imagePromises = data.images.map(async (img) => {
      let currentImgSrc = await import(`./assets/hero-slideshow/${img}`);
      currentImgSrc = currentImgSrc.default;
      const imgEl = document.createElement("img");
      imgEl.src = currentImgSrc;
      allImgsContainer.appendChild(imgEl);
    });

    await Promise.all(imagePromises);
  }

  // =====================
  // BASIC INFO
  // =====================
  cloneSection.querySelector(".plot-basic-info h2").textContent = data.title;
  cloneSection.querySelector(".plot-location p").textContent = data.location;

  // Plot info cards
  const infoCards = cloneSection.querySelector(".plot-info-cards");
  infoCards.innerHTML = "";

  const plotSizeCard = `
    <div class="card"><h2>${data.plotSize} sq ft</h2><p>Plot Size</p></div>`;
  const totalPriceCard = `
    <div class="card"><h2>₹${data.totalPrice} Lakh</h2><p>Total Price</p></div>`;
  const unitPriceCard = `
    <div class="card"><h2>₹${data.unitPrice}</h2><p>Per Sq Ft</p></div>`;
  const customCards = `
    <div class="card"><h2>${data.customInfoCard[0]}</h2><p>${data.customInfoCard[1]}</p></div>`;

  infoCards.innerHTML =
    plotSizeCard + totalPriceCard + unitPriceCard + customCards;

  // =====================
  // ABOUT
  // =====================
  cloneSection.querySelector(".about-plot p").textContent = data.about;

  // =====================
  // KEY FEATURES
  // =====================
  const featuresContainer = cloneSection.querySelector(
    ".key-features-container"
  );
  featuresContainer.innerHTML = "";
  data.keyFeatures.forEach((feature) => {
    const featureEl = document.createElement("div");
    featureEl.classList.add("key-feature-card");
    featureEl.innerHTML = `
      <div><div class="circular-bullet"></div></div>
      <p>${feature}</p>
    `;
    featuresContainer.appendChild(featureEl);
  });

  // =====================
  // SPECS
  // =====================
  const specsContainer = cloneSection.querySelector(".specs-container");
  specsContainer.innerHTML = "";
  for (let key in data.specs) {
    const specEl = document.createElement("div");
    specEl.classList.add("specs");
    specEl.innerHTML = `
      <p class="spec-name">${key}</p>
      <p class="spec-value">${data.specs[key]}</p>
    `;
    specsContainer.appendChild(specEl);
  }

  // =====================
  // LANDMARKS
  // =====================
  const landmarkContainer = cloneSection.querySelector(".nearby-landmarks");
  landmarkContainer.innerHTML = "<h2>Nearby Landmarks</h2>";
  for (let key in data.landmarks) {
    const lmEl = document.createElement("div");
    lmEl.classList.add("landmark");
    lmEl.innerHTML = `
      <p class="landmark-name">${key}</p>
      <p class="landmark-distance">${data.landmarks[key]}</p>
    `;
    landmarkContainer.appendChild(lmEl);
  }

  // =====================
  // PRICES (Right side container)
  // =====================
  const priceContainer = priceSectionClone;
  if (priceContainer) {
    priceContainer.querySelector(".total-price").textContent =
      `₹${data.totalPrice} Lakh`;
    priceContainer.querySelector(".unit-price").textContent =
      `₹${data.unitPrice} per sq ft`;
  }

  // Append to parent
  parent.appendChild(cloneSection);
  parent.appendChild(priceContainer);

  setupImageSwitcher();
}

// Example usage: fill data for plot with id=0
await fillData(0);

function setupImageSwitcher() {
  const currentImg = document.querySelector(".current-img img");
  const thumbnails = document.querySelectorAll(".all-imgs img");

  console.log(currentImg);
  console.log(thumbnails);

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Change main image
      currentImg.src = thumb.src;

      // Highlight active thumbnail
      thumbnails.forEach((t) => t.classList.remove("active-thumb"));
      thumb.classList.add("active-thumb");
    });
  });

  // Default highlight first image
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add("active-thumb");
  }
}
