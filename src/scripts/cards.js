import data from "../plot-details.json";
async function getData() {
  return data;
}

function populateWithSkeletons(numberOfSkeletons = 6) {
  const cardTemplate = document.querySelector(".card-template");
  const cardContainer = document.querySelector(".cards-container");

  cardContainer.textContent = "";

  for (let i = 0; i < numberOfSkeletons; i += 1) {
    const cloneCard = cardTemplate.cloneNode(true);
    cloneCard.classList.remove("card-template");
    cloneCard.classList.add(`card-${i + 1}`);
    cardContainer.append(cloneCard);
  }
}

async function fillData(card, dataObj) {
  let cardImg = await import(`../assets/hero-slideshow/${dataObj.images[0]}`);
  cardImg = cardImg.default;

  console.log(dataObj.plotSize);
  

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
  plotSize.textContent = `${dataObj.plotSize} sq ft`;
  cardTitle.textContent = dataObj.title;
  cardLocation.textContent = dataObj.location;
  price.textContent = `₹${dataObj.totalPrice} Lakh`;
  plurality.textContent = "Per Plot";
  btn.textContent = "View Details";

  for (let i = 0; i < 3; i += 1) {
    const tag = document.createElement("p");
    tag.textContent = dataObj.keyFeatures[i];
    if (i === 2) {
      tag.textContent = `+${dataObj.keyFeatures.length - i} More`;
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

async function populateSkeletons(numberOfSkeletons = 6) {
  const cards = document.querySelectorAll(".card");
  const data = await getData();
  for (let i = 0; i < numberOfSkeletons; i += 1) {
    const currentCard = cards[i];
    const currentDataObj = data[i];

    currentCard.dataset.id = i;
    const btn = currentCard.querySelector(".card-button-container");
    if (btn) {
      btn.setAttribute("href", `plotdetails.html?id=${i}`);
    }

    await fillData(currentCard, currentDataObj);
    removeSkeletons(currentCard);
  }
}

export { populateSkeletons, populateWithSkeletons };

// populateWithSkeletons(3);
// populateSkeletons(3);
