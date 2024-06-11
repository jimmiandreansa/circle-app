import { getProfileById } from "@/libs/api/call/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

export const getProfileByIdAsync = createAsyncThunk(
  "profile/getProfileById",
  async () => {
    try {
      const { userId } = useParams();
      const myProfileRes = await getProfileById(Number(userId));

      return myProfileRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
