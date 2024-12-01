import React from "react";
import "../css/Card.css";

export default function Card({
  img,
  title,
  date,
  author,
  source,
  mood,
  onChangeMood,
}) {
  const handleMoodChange = () => {
    const newMood = parseInt(prompt("Enter a mood between 1 and 10:"), 10);
    if (newMood >= 1 && newMood <= 10) {
      onChangeMood(newMood);
    } else {
      alert("Please enter a valid mood between 1 and 10.");
    }
  };

  return (
    <div className="CardList">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>Source:</strong> {source}
      </p>
      <p>
        <strong>description:</strong> {description}
      </p>
      <p>
        <strong>Mood Score:</strong> {mood}
      </p>
      <button onClick={handleMoodChange}>Change Mood</button>
    </div>
  );
}
