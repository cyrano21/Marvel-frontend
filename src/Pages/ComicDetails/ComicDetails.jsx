import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./comicDetails.css";

export default function ComicDetails() {
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();

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
      <div>
        <h1>
          <span>Title:</span> <br />
          {comic.title}
        </h1>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="responsive-image"
        />
        <p>
          <span>Description:</span> <br />
          {comic.description}
        </p>
      </div>
    </main>
  );
}
