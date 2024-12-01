import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import { NewsContext } from "../contexts/NewsContext";

export default function List() {
  const { newsData, loading, error } = useContext(NewsContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(newsData);
  }, [newsData]);

  const handleMoodChange = (key, updatedCard) => {
    setCards((prev) => {
      const updatedCards = Object.assign({}, prev);

      updatedCards[key] = Object.assign({}, updatedCards[key]);
      updatedCards[key].Mood = updatedCard.newMood;
      updatedCards[key].title = updatedCard.title;
      updatedCards[key].description = updatedCard.description;

      return updatedCards;
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="list-cards">
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
            onChangeMood={(updatedCard) => handleMoodChange(key, updatedCard)}
          />
          <Link to={`/article/${key}`} state={{ card }} className="read-more">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
