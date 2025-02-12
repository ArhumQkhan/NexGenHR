import React from "react";
import CardItem from "./cardItem";
import "./Cards.css"; // Import the CSS file for styling


function Cards() {
  // Example card data (replace with your actual data)
  const cardData = [
    {
      id: 1,
      src: "autoR.jpeg",
      text: "AI-driven job posting & candidate screening.",
      label: "Automated Recruitment System ",
      path: "/services",
    },
    {
      id: 2,
      src: "SHRM.jpeg",
      text: " Automate employee records, leave management, and performance tracking using AI-powered analytics.",
      label: "Smart HR Management",
      path: "/services",
    },
    {
      id: 3,
      src: "/payFia.png",
      text: "Handle salary calculations, tax deductions, and payslip generation seamlessly. Integrated with accounting tools.",
      label: "Payroll & Finance Automation",
      path: "/services",
    },

  ];

  return (
    <div className="cards">
      
      <h1>The Services We Provide!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {cardData.map((card) => (
              <CardItem
                key={card.id}
                src={card.src}
                text={card.text}
                label={card.label}
                path={card.path}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;