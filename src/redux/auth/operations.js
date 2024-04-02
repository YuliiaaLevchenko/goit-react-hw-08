import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const axiosInstance = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = '';
};

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/signup", userInfo);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/login", userInfo);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/users/logout");
    clearAuthHeader(null);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh", async (_, thunkAPI) => {
    
   const reduxState = thunkAPI.getState();
   const savedToken = reduxState.auth.token;

   if (!savedToken) {
    return thunkAPI.rejectWithValue("No token found in the state");
  }

  setAuthHeader(savedToken);
  
  try {
    const response = await axiosInstance.get("/users/current");
    return response.data;
  } catch (error) {
    
    return thunkAPI.rejectWithValue(error.message);
  }
},
  //   setAuthHeader(savedToken);
  //   const response = await axiosInstance.get("/users/current");

  //   return response.data;
  // },
  {
    condition: (_, { getState }) => {
      
      const reduxState = getState();
      const savedToken = reduxState.auth.token;

      return savedToken !== null;
    },
  }
);