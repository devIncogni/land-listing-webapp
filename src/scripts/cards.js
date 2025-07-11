async function getData() {
  let data = await fetch("property-cards.json");
  data = await data.json();
  console.log(data[1]);
}

getData();

function populateWithSkeletons() {
  const cardTemplate = document.querySelector(".card-template");
  const cardContainer = document.querySelector(".cards-container");

  cardContainer.textContent = '';

  for (let i = 0; i < 6; i += 1) {
    const cloneCard = cardTemplate.cloneNode(true);
    cardContainer.append(cloneCard);
  }
}

populateWithSkeletons()
