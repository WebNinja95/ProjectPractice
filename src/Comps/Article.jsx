import { useLocation } from "react-router-dom";
import "../css/Article.css";

export default function Article() {
  const location = useLocation();
  const { card } = location.state; // Get card data passed from List component

  return (
    <div className="Article">
      <h1>{card.title}</h1>
      <img
        src={card.image ? card.image : "https://via.placeholder.com/150"}
        alt={card.title}
      />
      <p>
        <strong>Date:</strong> {card.date}
      </p>
      <p>
        <strong>Author:</strong> {card.author}
      </p>
      <p>
        <strong>Source:</strong> {card.source}
      </p>
      <p>
        <strong>Description:</strong> {card.description}
      </p>
    </div>
  );
}
