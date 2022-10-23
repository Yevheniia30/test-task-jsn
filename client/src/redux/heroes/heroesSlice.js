import { createSlice } from "@reduxjs/toolkit";
import { getHeroes, createHero } from "./heroesOperations";

const initialState={
    heroes:[],
    loading:false,
    error: null
}

const heroesSlice=createSlice({
    name: 'heroes',
    initialState,
    extraReducers: {
        [getHeroes.pending]: state=>({
            ...state,
            loading: true,
            error: null
        }),
        [getHeroes.fulfilled]: (state, {payload})=>{
            state.heroes=payload;
            state.loading=false
        },
        [createHero.fulfilled]: (state, {payload})=>{
            state.heroes.rows.push(payload)
        }
        
    }
})

export default heroesSlice.reducer