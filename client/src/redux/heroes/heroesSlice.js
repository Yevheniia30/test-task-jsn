import { createSlice } from "@reduxjs/toolkit";
import {
  getHeroes,
  createHero,
  deleteHero,
  updateHero,
  getHero,
} from "./heroesOperations";

const initialState = {
  heroes: [],
  hero: null,
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
    [getHeroes.rejected]: (state, { error }) => {
      state.error = error;
      state.loading = false;
    },
    [getHero.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getHero.fulfilled]: (state, { payload }) => {
      state.hero = payload;
      state.loading = false;
    },
    [getHero.rejected]: (state, {error})=>{
      state.error=error;
      state.loading=false
    },
    [createHero.pending]: (state)=>{
      state.loading = true;
      state.error = null;
    },
    [createHero.fulfilled]: (state, { payload }) => {
      state.heroes.push(payload);
      state.loading=false

    },
    [createHero.rejected]: (state, {error})=>{
      state.error=error;
      state.loading=false
    },
    [deleteHero.pending]: (state)=>{
      state.loading = true;
      state.error = null;
    },
    [deleteHero.fulfilled]: (state, { payload }) => {
      // console.log("payload", payload);
      state.heroes = state.heroes.filter((item) => item.id !== payload);
      state.loading=false

    },
    [deleteHero.rejected]: (state, {error})=>{
      state.error=error;
      state.loading=false
    },
    [updateHero.pending]: (state)=>{
      state.loading = true;
      state.error = null;
    },
    [updateHero.fulfilled]: (state, { payload }) => {
      console.log("state.heroes", state.heroes, "payload", payload);
      state.heroes = state.heroes.map((item) =>
        Number(item.id) === Number(payload.id) ? payload : item
      );
      state.loading=false

    },
    [updateHero.rejected]: (state, {error})=>{
      state.error=error;
      state.loading=false
    },
  },
});

export default heroesSlice.reducer;
