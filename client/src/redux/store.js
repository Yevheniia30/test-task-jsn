import { configureStore } from "@reduxjs/toolkit";
import heroesSlice from "./heroes/heroesSlice";

export const store=configureStore({
    reducer: heroesSlice
})