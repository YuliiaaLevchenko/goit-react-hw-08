import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

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
      const response = await axios.post("/users/signup", userInfo);
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
      const response = await axios.post("/users/login", userInfo);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
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
    const response = await axios.get("/users/current");
    return response.data;
  } catch (error) {
    
    return thunkAPI.rejectWithValue(error.message);
  }
},
  {
    condition: (_, { getState }) => {
      
      const reduxState = getState();
      const savedToken = reduxState.auth.token;

      return savedToken !== null;
    },
  }
);