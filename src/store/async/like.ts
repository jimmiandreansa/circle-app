import { getLike } from "@/libs/api/call/like";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLikeAsync = createAsyncThunk(
  "like/getLike",
  async (threadId: number) => {
    try {
      const likeRes = await getLike(threadId);

      return likeRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);