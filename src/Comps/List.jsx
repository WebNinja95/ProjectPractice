import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { NewsContext } from "../contexts/NewsContext";

export default function List() {
  const { newsData, loading, error } = useContext(NewsContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="List-Cards">
      {newsData.map((card) => (
        <Link key={card.id} to={`/article/${card.id}`} state={{ card }}>
          <Card
            img={card.image ? card.image : "https://via.placeholder.com/150"}
            title={card.title}
            date={card.date}
            author={card.author}
            source={card.source}
          />
        </Link>
      ))}
    </div>
  );
}
