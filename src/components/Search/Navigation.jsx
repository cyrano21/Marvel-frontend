import { Link } from "react-router-dom";
import SearchBarHeader from "./SearchBarHeader";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/comics">Comics</Link>
      <Link to="/characters">Characters</Link>
      <SearchBarHeader />
      <Link to="/comics/:characterId">CharacterComics</Link>
    </nav>
  );
};

export default Navigation;
