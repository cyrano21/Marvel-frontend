import "./comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Search/SearchBar";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 50;
  const ITEMS_PER_PAGE = 15;
  const [index, setIndex] = useState(0);
  const [comicFavorites, setComicFavorites] = useState([]);
  const navigate = useNavigate();

  const handleComicClick = (comicId) => {
    navigate(`/comic/${comicId}`);
  };

  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      setIndex((prevIndex) => Math.min(prevIndex + 1, comics.length - 1));
    }
  };

  const toggleFavoriteComic = (comic) => {
    let currentComicFavorites =
      JSON.parse(localStorage.getItem("comicFavorites")) || [];

    if (currentComicFavorites.some((fav) => fav._id === comic._id)) {
      currentComicFavorites = currentComicFavorites.filter(
        (fav) => fav._id !== comic._id
      );
    } else {
      currentComicFavorites.push(comic);
    }

    localStorage.setItem(
      "comicFavorites",
      JSON.stringify(currentComicFavorites)
    );
    setComicFavorites(currentComicFavorites);
  };

  useEffect(() => {
    const storedComicFavorites =
      JSON.parse(localStorage.getItem("comicFavorites")) || [];
    setComicFavorites(storedComicFavorites);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://site--marvel-backend--cl5kfjmsrksj.code.run/comics?limit=${limit}&skip=${
            (currentPage - 1) * limit
          }`
        );
        setComics(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredComics.length / ITEMS_PER_PAGE);
  const currentItems = filteredComics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPreviousPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
  };

  return (
    <main className="page-content" onWheel={handleWheel}>
      <div className="inputBar">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          className="bar"
        />
        <p className="titre-container">COMICS</p>
        <button className="return-home" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <div className="comics-container scrollable">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          currentItems.map((comic, idx) => (
            <div
              key={comic.id}
              className={`comic-card ${idx === index ? "active" : ""}`}
              onClick={() => handleComicClick(comic._id)}
            >
              <button
                className="favorite-comic"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavoriteComic(comic);
                }}
              >
                {comicFavorites.some((fav) => fav._id === comic._id)
                  ? "❤️"
                  : "♡"}
              </button>
              <div className="comic-front">
                <p>Titre: {comic.title}</p>

                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt={comic.title}
                />
              </div>
              <div className="comic-back">
                <p className="back-title">Titre: {comic.title}</p>
                <div className="back-description">
                  <p>Description: {comic.description}</p>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Comics;
