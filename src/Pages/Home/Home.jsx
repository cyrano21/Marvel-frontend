import "../Home/home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1); // Nouvel état pour la pagination
  const navigate = useNavigate();

  const getAnimationClass = (index) => {
    switch (index % 4) {
      case 0:
        return "slideInFromLeft";
      case 1:
        return "slideInFromRight";
      case 2:
        return "slideInFromTop";
      case 3:
        return "slideInFromBottom";
      default:
        return "";
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "https://site--marvel-backend--cl5kfjmsrksj.code.run/characters",
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchComics = async () => {
    try {
      const response = await axios.get(
        "https://site--marvel-backend--cl5kfjmsrksj.code.run/comics",
      );
      setComics(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCharacters();
    fetchComics();

    const mettreAJourItemsToShow = () => {
      if (window.innerWidth <= 480) {
        setItemsToShow(1);
      } else if (window.innerWidth <= 900) {
        setItemsToShow(3);
      } else if (window.innerWidth <= 1024) {
        setItemsToShow(4);
      } else {
        setItemsToShow(5);
      }
    };

    mettreAJourItemsToShow();

    window.addEventListener("resize", mettreAJourItemsToShow);
    return () => window.removeEventListener("resize", mettreAJourItemsToShow);
  }, []);

  const handlePageChange = (currentItem, pageIndex) => {
    setCurrentPage(pageIndex + 1);
  };

  return (
    <main className="home-main">
      <div className="welcome-text">
        <h1>
          <p className="welcome">WELCOME TO MARVEL</p>
          <p className="home">HOME !</p>
        </h1>
      </div>

      <div className="welcome-title">
        <div className="part-char">
          <h1
            className="characters "
            onClick={() => {
              navigate("/characters");
            }}
          >
            PERSONNAGES
          </h1>
          <Carousel
            className="my-carousel"
            itemsToShow={itemsToShow}
            enableAutoPlay
            autoPlaySpeed={5000}
            paginationType="numbers"
          >
            {characters.map((character, index) => (
              <div
                key={character._id}
                className={`home-char ${getAnimationClass(index)}`}
                onClick={() => navigate(`/character/${character._id}`)}
              >
                <div className="p-title">
                  <p>{character.name}</p>
                </div>

                <div className="img-title">
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    style={{ border: "2px solid #000" }}
                    className="responsive-image"
                  />
                </div>
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
            COMICS
          </h1>
          <Carousel
            itemsToShow={1}
            itemPadding={[0, 10, 0, 10]}
            enableAutoPlay
            autoPlaySpeed={5000}
          >
            {comics.map((comic) => (
              <div
                key={comic._id}
                className="home-comic"
                onClick={() => navigate(`/comic/${comic._id}`)}
              >
                <div className="p-title">
                  <p>{comic.title}</p>
                </div>

                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  style={{ border: "2px solid #000" }}
                  className="responsive-image"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <button className="home-button">Home</button>
    </main>
  );
}
