import { createAsyncThunk } from "@reduxjs/toolkit";

export const get = createAsyncThunk("users/get", async () => {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return (await response.json()) as UserProps[];
});

export const store = createAsyncThunk(
  "users/store",
  async (user: Omit<UserProps, "id">) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return (await response.json()) as UserProps;
  },
);
