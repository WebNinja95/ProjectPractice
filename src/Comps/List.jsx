import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { NewsContext } from "../contexts/NewsContext";

export default function List() {
  const { newsData, loading, error } = useContext(NewsContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(newsData); // Synchronize `cards` with `newsData`
  }, [newsData]);

  const handleMoodChange = (key, newMood) => {
    setCards((prev) => {
      const updatedCards = { ...prev };
      const updatedCard = { ...updatedCards[key] };

      updatedCard.Mood = newMood;

      if (newMood >= 1 && newMood < 4) {
        updatedCard.title = `Positive: ${updatedCard.title}`;
        updatedCard.description = `This article is now labeled as positive. ${updatedCard.description}`;
      } else if (newMood >= 4 && newMood < 7) {
        updatedCard.title = `Kind: ${updatedCard.title}`;
        updatedCard.description = `This article is now labeled as kind. ${updatedCard.description}`;
      } else if (newMood >= 7 && newMood <= 10) {
        updatedCard.title = `Empathy: ${updatedCard.title}`;
        updatedCard.description = `This article is now labeled as empathetic. ${updatedCard.description}`;
      }

      updatedCards[key] = updatedCard;
      return updatedCards;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="List-Cards">
      {Object.entries(cards).map(([key, card]) => (
        <div key={key} className="card-wrapper">
          <Card
            img={card.image ? card.image : "https://via.placeholder.com/150"}
            title={card.title}
            date={card.published_at}
            author={card.author}
            source={card.source}
            description={card.description}
            mood={card.Mood}
            onChangeMood={(newMood) => handleMoodChange(key, newMood)}
          />
          <Link to={`/article/${key}`} state={{ card }} className="read-more">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
