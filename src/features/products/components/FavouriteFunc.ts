import { useState, useEffect } from "react";

const useFavoriteProducts = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  // Add or remove a product from favorites
  const toggleFavorite = (productId: string) => {
    let updatedFavorites;
    if (favorites.includes(productId)) {
      // Remove product from favorites
      updatedFavorites = favorites.filter((id) => id !== productId);
    } else {
      // Add product to favorites
      updatedFavorites = [...favorites, productId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, toggleFavorite };
};

export default useFavoriteProducts;
