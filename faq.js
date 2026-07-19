/**
 * FAQ entries. To add a question, just append an object here — the page
 * renders whatever is in this array.
 */
const faqItems = [
  {
    question: "What is Pig Pit?",
    answer:
      "Pig Pit is an event to bring together the community, for a day of great food, good company, high quality music, and choice vibes.",
  },
  {
    question: "When is Pig Pit 2026?",
    answer: "Pig Pit 2026 is on Saturday July 25th, 2026.",
  },
  {
    question: "Where is the event?",
    answer:
      "Elliot's house in the South End near the Othello light rail station. An exact address will be added closer to the event.",
  },
  {
    question: "How do I get there?",
    answer:
      "We always recommend public transit. Our nearest light rail station is Othello. Our nearest bus stop is MLK and Graham. See you soon!",
  },
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
    question: "Is Pig Pit vegetarian/vegan friendly?",
    answer:
      "Absolutely! While the pig is a major part of the event (hence the event's namesake) our potluck includes food that fits all varieties of diets!",
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
      "Okay, this is a serious one. We'll keep an eye on AQI forecasts and keep you all informed via Instagram and Partiful.",
  },
  {
    question: "Do I have to pay to go to Pig Pit?",
    answer:
      "No! We very much put this event on to bring people together, and have no expectation of money as part of the event. What we do ask is if you have a good time (or want some sick merch) and want to send a few dollaridoos our way... we wouldn't say no. This helps us fund the event and ensure we can keep throwing it for years to come.",
  },
  {
    question: "Why is there a suggested donation amount in the event?",
    answer:
      "Pig Pit is funded by the Pig Pit team. As the event has grown in size, so have our costs! To help sustain the event and to make it so we can make a bigger and better Pig Pit, we have been asking for donations at the event itself. Any amount helps and allows us to keep the event going year after year!",
  },
  {
    question: "Where does the money go?",
    answer:
      "A full breakdown of our costs and revenue for each year are available at https://pigpit.family/costs",
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
    answer.innerHTML = item.answer.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" style="color:#fccfa1;">$1</a>'
    );
    details.appendChild(answer);

    root.appendChild(details);
  });
})();
