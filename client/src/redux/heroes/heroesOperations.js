import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getHeroes = createAsyncThunk(
  "heroes/getHeroes",
  async ({ page, limit }) => {
    console.log("page, limit", page, limit);
    const { data } = await instance.get("/", {
      params: {
        page,
        limit,
      },
    });
    console.log("data", data);
    return data;
  }
);

export const getHero = createAsyncThunk("heroes/getHero", async (id) => {
  const { data } = await instance.get(`/${id}`);
  console.log('data', data);
  return data;
});

export const createHero = createAsyncThunk(
  "heroes/create",
  async (formData) => {
    const { data } = await instance.post("/create", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
    // console.log("data", data);
    return data;
  }
);

export const deleteHero = createAsyncThunk("heroes/delete", async (id) => {
  await instance.delete(`/${id}`);
  return id;
});

export const updateHero = createAsyncThunk("heroes/update", async (item) => {
  const { data } = await instance.patch("/update", item);
  return data;
});
