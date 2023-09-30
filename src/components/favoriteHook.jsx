import { useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return { favorites, isFavorite, toggleFavorite };
};
