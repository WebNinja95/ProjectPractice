import React from "react";
import "../css/Card.css";

export default function Card({ img, title, date, author, source }) {
  return (
    <div className="CardList">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{author}</p>
      <p>{source}</p>
    </div>
  );
}
