import React from "react";
import { BsArrowRightShort as ArrowRight } from "react-icons/bs";

const QuestionsArr = [
  {
    // Frage 1
    question:
      "Was waren die Top 10 Computerspiele?"
  },
  {
    // Frage 2
    question: "Welche Genre waren am gefragtesten?"
  },
  {
    // Frage 3
    question: "Waren Solo oder Co-OP Spiele häufiger in den Suchanfragen?"
  },
  {
    // Frage 4
    question: "In welchem Land wurden die meisten der von uns untersuchten Spiele entwickelt?"
  },
  {
    // Frage 5
    question: "Wie sah die Verteilung auf verschiedenen Plattformen aus?"
  },
  {
    // Frage 6
    question:
      "Welche Hersteller waren direkt am verbreitetsten in den Suchanfragen?"
  },
  {
    // Frage 7
    question:
      "Welche Hersteller waren indirekt am verbreitetsten in den Suchanfragen?"
  },
  {
    // Frage 8
    question:
      "Welche Spiele verzeichnen eine Häufung an (oder gar keine) Suchen nach Cheatcodes?"
  },
  {
    // Frage 9
    question: "Welche Websites wurden dafür frequentiert?"
  },
  {
    // Frage 10
    question:
      "Was sind die am längsten bestehenden Entwickler der von uns untersuchten Spiele?"
  },
];

export default function Questions() {
  const elements = QuestionsArr.map((Questions, index) => {
    let myIndex = index + 1;
    return (
      <React.Fragment key={index}>
        <div className="question-card">
          <h3>{(myIndex) + ". " + Questions.question}</h3>
          <a href={"question" + myIndex} className="btn">Abfrage öffnen <ArrowRight /></a>
        </div>
      </React.Fragment>
    );
  });
  return <div>{elements}</div>;
}
