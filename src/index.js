// CSS Imports
import "./styles/default-reset.css";
import "./styles/styles.css";
import "./styles/header-styles.css";
import "./styles/slideshow-styles.css";
import "./styles/text-underline-animation.css";
import "./styles/land-card-styles.css";
import "./styles/why-choose-us.css";
import "./styles/util-styles.css";
// JS Imports
import "./scripts/header";
import "./scripts/loader";
import "./scripts/slideshow";
import "./scripts/cards";

const faqs = document.querySelectorAll(".faq-card");

faqs.forEach((faq) => {
  const aElement = faq.querySelector("a");
  const faqAns = faq.querySelector(".faq-answer");
  aElement.addEventListener("click", () => {
    faqAns.classList.toggle("show");
  });
});
