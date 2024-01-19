import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorites.css";

function FavoritePage() {
  const [characterFavorites, setCharacterFavorites] = useState([]);
  const [comicFavorites, setComicFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCharacterFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setCharacterFavorites(storedCharacterFavorites);

    const storedComicFavorites =
      JSON.parse(localStorage.getItem("comicFavorites")) || [];
    setComicFavorites(storedComicFavorites);
  }, []);

  function removeFromCharacterFavorites(id) {
    const updatedFavorites = characterFavorites.filter(
      (character) => character._id !== id
    );
    setCharacterFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function removeFromComicFavorites(id) {
    const updatedFavorites = comicFavorites.filter((comic) => comic._id !== id);
    setComicFavorites(updatedFavorites);
    localStorage.setItem("comicFavorites", JSON.stringify(updatedFavorites));
  }

  return (
    <main className="fav-main">
      <button className="return-home" onClick={() => navigate("/")}>
        Home
      </button>
      <div className="favorites-container">
        <div className="char-fav">
          <h2>Personnages Favoris</h2>

          <div className="carousel-container">
            {characterFavorites.map((character, index) =>
              character ? (
                <div className="character-card" key={index}>
                  <button
                    className="remove-fav-btn"
                    onClick={() => removeFromCharacterFavorites(character._id)}
                  >
                    X
                  </button>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  <div className="infos">
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="com-fav">
          <h2>Comics Favoris</h2>

          <div className="carousel-container">
            {comicFavorites.map((comic, index) =>
              comic ? (
                <div className="comic-card" key={index}>
                  <button
                    className="remove-fav-btn"
                    onClick={() => removeFromComicFavorites(comic._id)}
                  >
                    X
                  </button>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />

                  <div className="infos">
                    <h3>{comic.title}</h3>
                    <p>{comic.description}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default FavoritePage;
