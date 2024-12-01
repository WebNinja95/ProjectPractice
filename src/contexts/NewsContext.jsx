import { createContext, useState, useEffect } from "react";
import { processTitleMood } from "../services/geminiAI.jsx";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "5ca2790d39cc91076ee874160a480e1e";
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en`;

    const fetchArticles = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          const titles = data.data.map((article) => article.title);
          console.log(titles);
          const array_scores = await processTitleMood(titles);
          const Array = data.data;
          console.log(array_scores);
          Array.forEach((obj, i) => {
            obj.Mood = array_scores[i];
          });
          console.log(Array);
          setNewsData(Array);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
};
