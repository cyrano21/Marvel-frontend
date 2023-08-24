export function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorite(character) {
  const favorites = getFavorites();
  const exists = favorites.find((fav) => fav.id === character.id);

  if (!exists) {
    favorites.push(character);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

export function removeFavorite(characterId) {
  let favorites = getFavorites();
  favorites = favorites.filter((character) => character.id !== characterId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(characterId) {
  const favorites = getFavorites();
  return favorites.some((character) => character.id === characterId);
}
