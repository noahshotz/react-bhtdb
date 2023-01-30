import React, { useEffect, useState } from "react";

import { BsArrowRightShort as ArrowRight } from "react-icons/bs";

import MyQuestion from "./MyQuestion";

const QuestionsArr = [
  {
    // Frage 1
    question:
      "Was waren die Top 10 Computerspiele?",
    query: "SELECT videogames.title AS game, COUNT(*) AS count FROM videogames, QUERYDATA WHERE QUERYDATA.QUERY LIKE '%' || videogames.title || '%' GROUP BY videogames.title LIMIT 10",
  },
  {
    // Frage 2
    question: "Welche Genre waren am gefragtesten?",
    query: "SELECT ... ",
  },
  {
    // Frage 3
    question: "Waren Solo oder Co-OP Spiele häufiger in den Suchanfragen?",
    query: "SELECT ...",
  },
  {
    // Frage 4
    question: "Waren online oder offline-Spiele beliebter?",
    query: "",
  },
  {
    // Frage 5
    question: "Wie sah die Verteilung auf verschiedenen Plattformen aus?",
    query:
      "SELECT platform.pId, CONCAT(hersteller, ' ', name) as platform, COUNT(*) AS count from platform, QUERYDATA WHERE QUERYDATA.QUERY LIKE CONCAT('% ', platform.name, '%') GROUP BY name ORDER BY count DESC",
  },
  {
    // Frage 6
    question:
      "Welche Hersteller waren direkt am verbreitetsten in den Suchanfragen?",
    query: "SELECT ...",
  },
  {
    // Frage 7
    question:
      "Welche Hersteller waren indirekt am verbreitetsten in den Suchanfragen?",
    query: "SELECT ...",
  },
  {
    // Frage 8
    question:
      "Welche Spiele verzeichnen eine Häufung an (oder gar keine) Suchen nach Cheatcodes?",
    query: "SELECT ...",
  },
  {
    // Frage 9
    question: "Welche Websites wurden dafür frequentiert?",
    query: "SELECT ...",
  },
  {
    // Frage 10
    question:
      "Gibt es Häufungen in Suchen/Käufen von Spielen in bestimmten Staaten?",
    query: "SELECT ...",
  },
];

export default function Questions() {
  const elements = QuestionsArr.map((Questions, index) => {
    let myIndex = index+1;
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
