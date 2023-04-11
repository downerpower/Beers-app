import { configureStore } from "@reduxjs/toolkit";
import beerSliceReducer from "./beer-slice";

function configureMainStore() {
  const store = configureStore({
    reducer: {
      beers: beerSliceReducer,
    },
  });
  return store;
}

export const store = configureMainStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
