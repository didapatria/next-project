import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, store } from "./thunk";

const initialState: UserState = {
  users: [],
  status: "idle",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get.fulfilled, (state, action: PayloadAction<UserProps[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(get.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(store.pending, (state) => {
        state.status = "loading";
      })
      .addCase(store.fulfilled, (state, action: PayloadAction<UserProps>) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(store.rejected, (state) => {
        state.status = "failed";
      });
  },
});
