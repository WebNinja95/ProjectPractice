import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./Comps/List";
import Article from "./Comps/Article";
import "./css/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
