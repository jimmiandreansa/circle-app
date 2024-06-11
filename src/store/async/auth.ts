import { getProfile } from "@/libs/api/call/profile";
import { loginApi, registerApi } from "@/libs/api/call/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (body: {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }, thunkAPI) => {
    try {
      await registerApi(body);
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { data: { message: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (body: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await loginApi(body);

      const token = res.data.data;
      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { data: { message: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getProfileAsync = createAsyncThunk("auth/getProfile", async () => {
  try {
    const { data } = await getProfile();

    return data.data;
  } catch (error) {
    console.log(error);
  }
});
