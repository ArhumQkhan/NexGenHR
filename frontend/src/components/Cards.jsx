import React from "react";
import CardItem from "./cardItem";
import "./Cards.css";
import { motion } from "framer-motion";

function Cards() {
  const cardData = [
    {
      id: 1,
      src: "autoR.jpeg",
      text: "AI-driven job posting & candidate screening.",
      label: "Automated Recruitment System",
      path: "/services",
    },
    {
      id: 2,
      src: "SHRM.jpeg",
      text: "Automate employee records, leave management, and performance tracking using AI-powered analytics.",
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
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                <CardItem
                  src={card.src}
                  text={card.text}
                  label={card.label}
                  path={card.path}
                />
              </motion.div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
