import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../components/redux/interface";

interface BasketItem {
    
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: JSON.parse(localStorage.getItem("basketItems") || "[]"),
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item?.product.id === product.id
      );
    //   const isExist = state.items.some((fav:any) => fav.id === product.id);
      if (existingItemIndex > -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push({ product, quantity: 1 });
      }

      localStorage.setItem("basketItems", JSON.stringify(state.items));
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);

      localStorage.setItem("basketItems", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex > -1) {
        state.items[existingItemIndex].quantity++;
      }

      localStorage.setItem("basketItems", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex > -1 && state.items[existingItemIndex].quantity > 1) {
        state.items[existingItemIndex].quantity--;
      }

      localStorage.setItem("basketItems", JSON.stringify(state.items));
    },
    clearBasket: (state) => {
      state.items = [];
      localStorage.removeItem("basketItems");
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  increaseQuantity,
  decreaseQuantity,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
