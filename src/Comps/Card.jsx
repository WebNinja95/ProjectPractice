import React from "react";
import "../css/Card.css";
import { changeMood } from "../services/geminiAI.jsx";

export default function Card({
  img,
  title,
  date,
  author,
  source,
  mood,
  onChangeMood,
  description,
}) {
  const handleMoodChange = async () => {
    const newMood = parseInt(prompt("Enter a mood between 1 and 10:"), 10);
    if (newMood >= 1 && newMood <= 10) {
      try {
        const updatedData = await changeMood({ title, description }, newMood);

        const updatedCard = Object.assign({}, { newMood }, updatedData);
        onChangeMood(updatedCard);
      } catch (error) {
        console.error("Error updating mood:", error);
        alert("An error occurred while updating the mood.");
      }
    } else {
      alert("Please enter a valid mood between 1 and 10.");
    }
  };

  return (
    <div className="card">
      <img src={img} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-date">
        <strong>Date:</strong> {date}
      </p>
      <p className="card-author">
        <strong>Author:</strong> {author}
      </p>
      <p className="card-source">
        <strong>Source:</strong> {source}
      </p>
      <p className="card-description">
        <strong>Description:</strong> {description}
      </p>
      <p className="card-mood">
        <strong>Mood Score:</strong> {mood}
      </p>
      <button className="change-mood-button" onClick={handleMoodChange}>
        Change Mood
      </button>
    </div>
  );
}
