import "./CharacterDetails.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CharacterDetails() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const { characterId } = useParams();
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
      try {
        setLoading(true);
        const response = await axios.get(
          `https://site--marvel-backend--cl5kfjmsrksj.code.run/comics/${characterId}`
        );
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };
    fetchData();
  }, [characterId]);

  return loading ? (
    <span>loading...</span>
  ) : (
    <main className="CharacterDetails">
      <div className="char-btn">
        <button className="return-home" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="fav-btn" onClick={() => toggleFavorite(item)}>
          {favorites.some((fav) => fav._id === item._id) ? "❤️" : "♡"}
        </button>
        <button
          className="bascul-btn"
          onClick={() => setIsAlternate(!isAlternate)}
        >
          Basculer la mise en page
        </button>
        <button
          className="go_chraraters"
          onClick={() => navigate("/characters")}
        >
          Personnages
        </button>
      </div>

      <div className="text">
        <span>
          <p>{item.name}</p>
        </span>

        <span>{item.description}</span>
      </div>

      <div>
        <div className="image">
          <img
            src={item.thumbnail.path + "." + item.thumbnail.extension}
            alt=""
            onError={(e) => {
              e.target.src = "/images/default-character.jpg";
            }}
          />
        </div>

        <div className={`comics-section ${isAlternate ? "alternate" : ""}`}>
          <h3>Comics associés</h3>
          {item.comics && item.comics.length > 0 ? (
            item.comics.map((comic, index) => (
              <div
                key={comic._id}
                className={`comics-blocks ${isAlternate ? "alternate" : ""}`}
              >
                <Link to={`/comic/${comic._id}`}>
                  <p>{comic.title}</p>

                  {comic.thumbnail &&
                  comic.thumbnail.path &&
                  comic.thumbnail.extension ? (
                    <img
                      className="comic-image"
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      alt={comic.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-comic.jpg";
                      }}
                    />
                  ) : (
                    <img
                      className="comic-image"
                      src="/images/default-comic.jpg"
                      alt="Default Comic"
                    />
                  )}
                </Link>
              </div>
            ))
          ) : (
            <p>Pas de comics associés à ce personnage.</p>
          )}
        </div>
      </div>
    </main>
  );
}
