import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Characters from "./Pages/Characters/Characters";
import Comics from "./Pages/Comics/Comics";
import CharacterDetails from "./Pages/CharacterDetails/CharacterDetails";
import Favorites from "./Pages/Favorites/Favorites";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import CharacterComics from "./Pages/CharacterComics/CharacterComics";
import ComicDetails from "./Pages/ComicDetails/ComicDetails";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ overflowY: "hidden" }}></div>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character/:characterId" element={<CharacterDetails />} />
        <Route path="/comic/:comicId" element={<ComicDetails />} />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
      </Routes>

      <Footer>
        <Link to="/">Home</Link>
      </Footer>
    </Router>
  );
}

export default App;
