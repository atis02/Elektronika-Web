import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Product } from "./interface";

// interface Product {
//   id: number;
//   [key: string]: any;
// }

interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id === product.id);

      if (isFavorite) {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== product.id
        );
      } else {
        state.favorites.push(product);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      toast.success("Üstünlikli!");
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      toast.success("Üstünlikli!");
    },
    clearAllFav: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
      toast.success("Üstünlikli!");
    },
  },
});

export const { toggleFavorite, removeProduct, clearAllFav } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
