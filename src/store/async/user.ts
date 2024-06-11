import { getUserSuggest } from "@/libs/api/call/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserSuggestAsync = createAsyncThunk("user/getUserSuggest", async () => {
  try {
    const res = await getUserSuggest();
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
})