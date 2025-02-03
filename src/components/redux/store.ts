import { configureStore } from "@reduxjs/toolkit";
import compareReducer from "./ProductSlice";
import favoritesReducer from "./favouriteSlice";
import basketReducer from '../../store/basket/BaskerWithRedux'
const store = configureStore({
  reducer: {
    compare: compareReducer,
    favorites: favoritesReducer,
    basket:basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
