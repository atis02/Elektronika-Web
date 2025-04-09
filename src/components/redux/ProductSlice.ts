import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./interface";
import toast from "react-hot-toast";

interface CompareState {
  products: Product[];
  isOpenFastCompare:boolean
}

const initialState: CompareState = {
  products: JSON.parse(localStorage.getItem("compareProducts") || "[]"),
  isOpenFastCompare: false,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
        if (state.products.length >= 4) {
            toast.error("Deňeşdiriýan harytlar 4 kän bolup bilmeýär!");
            return;
          }
      if (!state.products.find((product) => product.id === action.payload.id)) {
        state.products.push(action.payload);
        localStorage.setItem("compareProducts", JSON.stringify(state.products));
        toast.success("Üstünlikli!");

      }
      state.isOpenFastCompare = true;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("compareProducts", JSON.stringify(state.products));
      toast.success("Üstünlikli!");

    },
    clearProducts: (state) => {
      state.products = [];
      localStorage.removeItem("compareProducts");
      toast.success("Üstünlikli!");
      state.isOpenFastCompare = false;

    },
    closeFastCompare: (state) => {
      state.isOpenFastCompare = false;
    }
  },
});

export const { addProduct, removeProduct, clearProducts ,closeFastCompare} = compareSlice.actions;
export default compareSlice.reducer;
