// CSS Imports
import "./styles/default-reset.css";
import "./styles/styles.css";
import "./styles/header-styles.css";
import "./styles/about-styles.css";
import "./styles/text-underline-animation.css";
import "./styles/why-choose-us.css";
import "./styles/footer.css";
import "./styles/util-styles.css";
// JS Imports
import "./scripts/header";
import "./scripts/loader";

// Script for automatically rendering team cards

import teamData from "./team-cards.json";
console.log(teamData);

async function renderTeamCards(numberOfCards = 6) {
  const finalNum = Math.min(numberOfCards, teamData.length);
  const teamCardContainer = document.querySelector(".team-card-container");
  const teamCardTemplate = document.querySelector(".team-card-template");
  teamCardContainer.textContent = "";

  for (let i = 0; i < finalNum; i += 1) {
    let teamMemberImg = await import(`./assets/about/${teamData[i].image}`);
    teamMemberImg = teamMemberImg.default;

    const currentCard = teamCardTemplate.cloneNode(true);
    const img = currentCard.querySelector("img");
    const nameSpace = currentCard.querySelector("h3");
    const designationSpace = currentCard.querySelector("h4");
    const descriptionSpace = currentCard.querySelector("p");

    img.setAttribute("src", teamMemberImg);
    nameSpace.textContent = teamData[i].name;
    designationSpace.textContent = teamData[i].designation;
    descriptionSpace.textContent = teamData[i].description;

    teamCardContainer.append(currentCard);
  }
  //   console.log(teamData.length);
}

renderTeamCards();
