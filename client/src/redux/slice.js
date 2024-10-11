import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  username: "",
  password: "",
  token: "",
};

const BASE_URL = "http://localhost:3001/api/v1/user";
// Define an async thunk for making the API call
export const login = createAsyncThunk("api/fetchData", async () => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email: "test@test",
      password: "test",
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("data", data);
  return data;
});

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.body.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  setUsername,
  setPassword,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
