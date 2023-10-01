import "./CharacterDetails.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
export default function CharacterDetails() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/comics/${characterId}`);
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
      <div className="text">
        <span>
          <p> Name :</p> {item.name}
        </span>

        <span>
          <p> Description : </p> {item.description}
        </span>
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

        <div className="comics-section">
          <h3>Comics associés:</h3>
          {item.comics && item.comics.length > 0 ? (
            item.comics.map((comic) => (
              <div key={comic._id}>
                <Link to={`/comic/${comic._id}`}>
                  {comic.title}
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
            <p>No comics available for this character.</p>
          )}
        </div>
      </div>
    </main>
  );
}
