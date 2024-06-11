import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyProfile, getProfileById } from "@/libs/api/call/profile";
import { useParams } from "react-router-dom";

export const getMyProfileAsync = createAsyncThunk(
  "profile/getMyProfile",
  async () => {
    try {
      const myProfileRes = await getMyProfile();

      return myProfileRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
