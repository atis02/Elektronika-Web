import { useState, useEffect } from "react";

const useFavoriteProducts = () => {
  const [favorites, setFavorites] = useState<any[]>([]); // Store objects, not strings

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  // Add or remove a product from favorites
  const toggleFavorite = (product: any) => {
    let updatedFavorites;
    const isFavorite = favorites.some((fav) => fav.id === product.id);

    if (isFavorite) {
      // Remove product from favorites
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      // Add product to favorites
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, toggleFavorite };
};

export default useFavoriteProducts;
