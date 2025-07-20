import faqData from "../faqs.json";
import plusSVG from "../assets/faq/plus.svg";
import minusSVG from "../assets/faq/minus.svg";

function populateWithFaqs(numberOfFaqs = 100) {
  const limit = Math.min(numberOfFaqs, faqData.length);

  const faqContainer = document.querySelector(".faq-container");
  const templateFaq = document.querySelector(".template-faq");

  faqContainer.textContent = "";

  for (let i = 0; i < limit; i += 1) {
    const cloneFAQ = templateFaq.cloneNode(true);
    cloneFAQ.classList.remove("template-faq");

    const quesH3 = cloneFAQ.querySelector(".faq-question>h3");
    const ansP = cloneFAQ.querySelector(".faq-answer>p");
    quesH3.textContent = faqData[i].ques;
    ansP.textContent = faqData[i].ans;
    faqContainer.append(cloneFAQ);
  }
}

populateWithFaqs();

const faqs = document.querySelectorAll(".faq-card");

faqs.forEach((faq) => {
  const aElement = faq.querySelector("a");
  const imgElement = faq.querySelector(".faq-question>img");
  const faqAns = faq.querySelector(".faq-answer");
  aElement.addEventListener("click", () => {
    faqAns.classList.toggle("show");
    if (faqAns.classList.contains("show")) {
      imgElement.src = minusSVG;
    } else {
      imgElement.src = plusSVG;
    }
  });
});
