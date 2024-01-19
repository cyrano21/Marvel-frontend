import "./searchBar.css";
export default function SearchBar({ searchTerm, handleSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
