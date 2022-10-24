import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import heroesSlice from "./heroes/heroesSlice";

export const store = configureStore({
  reducer: heroesSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
