import "./comicDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComicDetails() {
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();
  const [comicFavorites, setComicFavorites] = useState([]); // Utilisez comicFavorites
  const navigate = useNavigate();

  const toggleFavorite = (comic) => {
    // Renommez la variable de l'argument pour éviter les confusions
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
    ); // Utilisez comicFavorites
    setComicFavorites(currentComicFavorites); // Utilisez comicFavorites
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://site--marvel-backend--cl5kfjmsrksj.code.run/comic/${comicId}`
        );
        setComic(response.data);
      } catch (err) {
        console.error("An error occurred:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [comicId]);

  return loading ? (
    <span>Loading...</span>
  ) : (
    <main className="ComicDetails">
      <div className="comic-btn">
        <button className="return-home" onClick={() => navigate("/")}>
          Home
        </button>
        <button
          className="fav-btn-comic"
          onClick={() => toggleFavorite(comic)} // Utilisez la fonction toggleFavorite
        >
          {comicFavorites.some((fav) => fav._id === comic._id) ? "❤️" : "♡"}{" "}
          {/* Utilisez comicFavorites */}
        </button>
        <button className="go_comics" onClick={() => navigate("/comics")}>
          Comics
        </button>
      </div>
      <div className="comic-bloc">
        <h1>
          <span> {comic.title}</span> <br />
        </h1>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="responsive-image"
        />
        <p>
          {comic.description} <br />
        </p>
      </div>
    </main>
  );
}
