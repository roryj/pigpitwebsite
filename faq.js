/**
 * FAQ entries. To add a question, just append an object here — the page
 * renders whatever is in this array.
 */
const faqItems = [
  {
    question: "Can I bring my pet?",
    answer:
      "Well-behaved pets are welcome at Pig Pit. Human discretion is encouraged.",
  },
  {
    question: "Can I bring my friends?",
    answer: "Yes, please do! Well-behaved friends are welcome.",
  },
  {
    question: "Can I bring my friends' friends?",
    answer:
      "Sure! Just don't forget that Pig Pit is a potluck -- so bring something to share with the rest of the party.",
  },
  {
    question: "Will there be food for my dietary restriction?",
    answer:
      "Probably! We'll provide food labels for dietary restrictions and allergens. The surest way to guarantee it is to bring something you like to eat to share.",
  },
  {
    question: "What if the weather is bad?",
    answer: "A little heat/rain won't stop the party. Come on down, wear a hat.",
  },
  {
    question: "What if there's bad air quality?",
    answer:
      "Okay, this is a serious one. We'll keep an eye on AIQ forecasts and keep you all informed via Instagram and Partiful.",
  },
];

(function () {
  const root = document.getElementById("faq-list");

  faqItems.forEach((item) => {
    const details = document.createElement("details");
    details.className = "faq-item";

    const summary = document.createElement("summary");
    summary.className = "faq-question";
    summary.textContent = item.question;
    details.appendChild(summary);

    const answer = document.createElement("p");
    answer.className = "faq-answer";
    answer.textContent = item.answer;
    details.appendChild(answer);

    root.appendChild(details);
  });
})();
