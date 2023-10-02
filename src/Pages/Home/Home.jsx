import "../Home/home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
// const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
// const baseURL = BASE_URL || "http://localhost:3000";
=======
const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
>>>>>>> 541021ceedca4963ab41d3a9945a550f07d1953d

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--cl5kfjmsrksj.code.run/characters"
      );
      setCharacters(response.data.results);
    };

    const fetchComics = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--cl5kfjmsrksj.code.run/comics"
      );
      setComics(response.data.results);
    };

    fetchCharacters();
    fetchComics();
  }, []);

  return (
    <main style={{ marginTop: "120px" }}>
      <div className="welcome-text" style={{ marginTop: "100px" }}>
        <h1>WELCOME TO MARVEL HOME !</h1>
      </div>

      <div className="welcome-title">
        <div className="part-char">
          <h1
            className="characters "
            onClick={() => {
              navigate("/characters");
            }}
          >
            Characters
          </h1>
          <Carousel itemsToShow={5} enableAutoPlay autoPlaySpeed={5000}>
            {characters.map((character) => (
              <div
                key={character._id}
                className="home-char"
                onClick={() => navigate(`/character/${character._id}`)}
              >
                <p>{character.name}</p>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  style={{ border: "2px solid #000" }}
                  className="responsive-image"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="part-comic">
          <h1
            className="comics"
            onClick={() => {
              navigate("/comics");
            }}
          >
            Comics
          </h1>
          <Carousel
            itemsToShow={3}
            itemPadding={[0, 10, 0, 10]}
            enableAutoPlay
            autoPlaySpeed={10000}
          >
            {comics.map((comic) => (
              <img
                key={comic.id}
                // className="carousel-image"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                onClick={() => navigate(`/comic/${comic._id}`)}
                className="responsive-image"
              />
            ))}
          </Carousel>
        </div>
      </div>
      <button className="home-button">Home</button>
    </main>
  );
}
