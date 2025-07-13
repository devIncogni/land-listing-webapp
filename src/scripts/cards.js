import data from "../property-cards.json";
async function getData() {
  return data;
}

function populateWithSkeletons() {
  const cardTemplate = document.querySelector(".card-template");
  const cardContainer = document.querySelector(".cards-container");

  cardContainer.textContent = "";

  for (let i = 0; i < 6; i += 1) {
    const cloneCard = cardTemplate.cloneNode(true);
    cloneCard.classList.remove("card-template");
    cloneCard.classList.add(`card-${i + 1}`);
    cardContainer.append(cloneCard);
  }
}

populateWithSkeletons();

async function fillData(card, dataObj) {
  let cardImg = await import(`../assets/hero-slideshow/${dataObj.image}`);
  cardImg = cardImg.default;

  let locationImage = await import(`../assets/loaction.svg`);
  locationImage = locationImage.default;

  const img = card.querySelector(".card-img-holder>img");
  const plotSize = card.querySelector("[data-plot-size]");
  const cardTitle = card.querySelector(".card-title");
  const cardLocation = card.querySelector(".card-location > p");
  const price = card.querySelector("[data-price]");
  const plurality = card.querySelector("[data-plot-plurality]");
  const btn = card.querySelector(".card-button-container>button>p");
  const tagsDiv = card.querySelector(".tags");
  const locationImg = card.querySelector(".card-location> img");

  img.setAttribute("src", cardImg);
  locationImg.setAttribute("src", locationImage);
  locationImg.classList.add("loaded-location");
  plotSize.textContent = dataObj.plotSize;
  cardTitle.textContent = dataObj.cardTitle;
  cardLocation.textContent = dataObj.cardLocation;
  price.textContent = dataObj.price;
  plurality.textContent = dataObj.plurality;
  btn.textContent = "View Details";

  for (let i = 0; i < 3; i += 1) {
    const tag = document.createElement("p");
    tag.textContent = dataObj.tags[i];
    if (i === 2) {
      tag.textContent = `+${dataObj.tags.length - i} More`;
    }
    tagsDiv.append(tag);
  }
}

function removeSkeletons(card) {
  card.querySelectorAll(".skeleton-text").forEach((s) => {
    s.remove();
  });

  card.querySelectorAll(".skeleton").forEach((s) => {
    s.classList.remove("skeleton");
  });
}

async function populateSkeletons() {
  const cards = document.querySelectorAll(".card");
  const data = await getData();

  for (let i = 0; i < 6; i += 1) {
    const currentCard = cards[i];
    const currentDataObj = data[i];
    await fillData(currentCard, currentDataObj);
    removeSkeletons(currentCard);
  }
}

populateSkeletons();
