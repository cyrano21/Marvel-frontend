import { useState, useEffect } from "react";
import axios from "axios";
import "./characters.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";
import { Link } from "react-router-dom";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 100;
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isAlternate, setIsAlternate] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = (character) => {
    let currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (currentFavorites.some((fav) => fav._id === character._id)) {
      currentFavorites = currentFavorites.filter(
        (fav) => fav._id !== character._id
      );
    } else {
      currentFavorites.push(character);
    }

    localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    setFavorites(currentFavorites);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);

      setLoading(true);
      try {
        const offset = (currentPage - 1) * limit;
        let filters = `?limit=${limit}&skip=${offset}`;
        if (searchTerm) {
          filters += `&name=${searchTerm}`;
        }

        const url = `https://site--marvel-backend--cl5kfjmsrksj.code.run/characters${filters}`;

        console.log("Fetching data from:", url);
        const response = await axios.get(url);

        const results = response.data.results;
        setCharacters(results);

        if (results.length < limit) {
          setTotalPages(currentPage);
        } else {
          setTotalPages(currentPage + 1);
        }
      } catch (error) {
        console.error("An error occurred while fetching characters:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage, searchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  const handleFavoriteClick = (e, character) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const characterCardClass = isAlternate ? "char-card alternate" : "char-card";

  return loading ? (
    <div className="spinner"></div>
  ) : (
    <div>
      <div className="inputBar">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />

        <button className="return-home" onClick={() => navigate("/")}>
          Home
        </button>
        <button
          className="toggle-layout"
          onClick={() => setIsAlternate(!isAlternate)}
        >
          Basculer la mise en page
        </button>
      </div>

      <p className="char-titre-container">PERSONNAGES</p>

      <div className="char-container">
        {filteredCharacters.map((character) => (
          <div
            key={character._id}
            className={characterCardClass}
            onClick={() => handleCharacterClick(character._id)}
          >
            <button
              className="favorite"
              onClick={(e) => handleFavoriteClick(e, character)}
            >
              {favorites.some((fav) => fav._id === character._id) ? "❤️" : "♡"}
            </button>
            <div className="char-inner">
              <div className="char-inner-p">
                <p> {character.name}</p>
              </div>

              <div className="char-front">
                {character.thumbnail &&
                  character.thumbnail.path &&
                  character.thumbnail.extension && (
                    <div>
                      <div className="image">
                        <img
                          src={
                            character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                          }
                          alt={character.name}
                          onError={(e) => {
                            e.target.onerror = null; // prevent infinite loops
                            e.target.src = "/images/default-character.jpg"; // path to your default image
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="char-back">
              <h2>
                <span>{character.name}</span>
              </h2>
              <br />
              <div>
                <p> {character.description}</p>
              </div>
            </div>

            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <Link to={`/character/${character._id}/comics`}></Link>
          </div>
        ))}

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Précédent
          </button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
