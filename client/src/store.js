import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./redux/slice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
  },
});
