import "./CharacterDetails.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CharacterDetails() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const { characterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      <button className="return-home" onClick={() => navigate("/")}>
        Home
      </button>

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
            <p>Pas de comics associés à ce personnage.</p>
          )}
        </div>
      </div>
    </main>
  );
}
