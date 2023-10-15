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
import ModalConnexion from "./components/Modal/ModalConnexion";
import ModalInscription from "./components/Modal/ModalInscription";
import { useState } from "react";

function App() {
  const [showInscriptionModal, setShowInscriptionModal] = useState(false);
  const [showConnexionModal, setShowConnexionModal] = useState(false);
  const handleSignUpClick = () => {
    setShowConnexionModal(false);
    setShowInscriptionModal(true);
  };
  return (
    <Router>
      <Header
        showInscriptionModal={showInscriptionModal}
        setShowInscriptionModal={setShowInscriptionModal}
        showConnexionModal={showConnexionModal}
        setShowConnexionModal={setShowConnexionModal}
      />

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
      {showInscriptionModal && (
        <ModalInscription setShowInscriptionModal={setShowInscriptionModal} />
      )}
      {showConnexionModal && (
        <ModalConnexion
          setShowConnexionModal={setShowConnexionModal}
          onSignUpClick={handleSignUpClick}
        />
      )}
    </Router>
  );
}

export default App;
