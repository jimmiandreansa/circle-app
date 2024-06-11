import { getFollower, getFollowing } from "@/libs/api/call/follow";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFollowingAsync = createAsyncThunk(
  "auth/getFollowing",
  async () => {
    try {
      const res = await getFollowing();
      console.log("get following", res.data.data)

      return res.data.data;
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err);
    }
  }
);

export const getFollowerAsync = createAsyncThunk(
  "auth/getFollower",
  async () => {
    try {
      const res = await getFollower();

      return res.data.data;
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err);
    }
  }
);