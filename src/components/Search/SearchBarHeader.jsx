import { useState, useEffect } from "react";
import axios from "axios";

const SearchBarHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(0);

  const searchHandler = async (e) => {
    e.preventDefault();
    const comicsResponse = await axios.get(
      `http://localhost:3000/comics?title=${searchTerm}`
    );
    const charactersResponse = await axios.get(
      `http://localhost:3000/characters?name=${searchTerm}`
    );

    const combinedResults = [
      ...comicsResponse.data,
      ...charactersResponse.data,
    ];
    setResults(combinedResults);
  };

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % results.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [results]);

  return (
    <div>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <div>
          <img
            src={`${results[index].thumbnail.path}.${results[index].thumbnail.extension}`}
            alt={results[index].title || results[index].name} // Use title for comics, name for characters
          />
        </div>
      )}
    </div>
  );
};

export default SearchBarHeader;
