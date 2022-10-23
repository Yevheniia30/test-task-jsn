import { createSlice } from "@reduxjs/toolkit";
import {
  getHeroes,
  createHero,
  deleteHero,
  updateHero,
} from "./heroesOperations";

const initialState = {
  heroes: [],
  loading: false,
  error: null,
  count: null,
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  extraReducers: {
    [getHeroes.pending]: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    [getHeroes.fulfilled]: (state, { payload }) => {
      state.heroes = payload.rows;
      state.count = payload.count;
      state.loading = false;
    },
    [createHero.fulfilled]: (state, { payload }) => {
      state.heroes.push(payload);
    },
    [deleteHero.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.heroes = state.heroes.filter((item) => item.id !== payload);
    },
    [updateHero.fulfilled]: (state, { payload }) => {
        console.log('state.heroes', state.heroes, 'payload', payload);
      state.heroes = state.heroes.map((item) =>
        item.id === payload ? payload : item
      );
    },
  },
});

export default heroesSlice.reducer;
