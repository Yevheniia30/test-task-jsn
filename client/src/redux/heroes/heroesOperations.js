import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'

const instance=axios.create({
    baseURL: "http://localhost:5000/api"
})

export const getHeroes=createAsyncThunk('heroes/getHero', async()=>{
    const {data}=await instance.get()
    console.log('data', data);
    return data
})

export const getHero=createAsyncThunk()

export const createHero=createAsyncThunk('heroes/create', async hero=>{
    const{data}=await instance.post('/create', hero);
    console.log('data', data);
    return data
})

export const deleteHero=createAsyncThunk()

export const updateHero=createAsyncThunk()