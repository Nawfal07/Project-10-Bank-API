import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  username: "",
  password: "",
  token: "",
  error: "",
  user: null,
};

const BASE_URL = "http://localhost:3001/api/v1/user";

export const login = createAsyncThunk(
  "api/fetchData",
  async (arg, { getState }) => {
    // Accessing the entire Redux state
    const state = getState();

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: state.authentication.username,
        password: state.authentication.password,
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "api/userDetails",
  async (arg, { getState }) => {
    // Accessing the entire Redux state
    const state = getState();

    const response = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authentication.token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const editUserProfile = createAsyncThunk(
  "api/editUserProfile",
  async ({ firstName, lastName }, { getState }) => {
    const state = getState();

    const response = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      body: JSON.stringify({
        firstName,
        lastName,
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.authentication.token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

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
        state.token = action.payload?.body?.token || "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.body;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUsername, setPassword, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
