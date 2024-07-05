import { createSlice } from "@reduxjs/toolkit";
import {
  getMyProfileAsync,
  getProfileByIdAsync,
  updateProfileAsync,
} from "../async/profile";
import { IProfile } from "@/type/app";

interface IInitialState {
  profile: IProfile[];
  loading: boolean;
  errorMessage: string;
  isError: boolean;
}

const initialState: IInitialState = {
  profile: [],
  loading: false,
  errorMessage: "",
  isError: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMyProfileAsync.fulfilled, (state, action) => {
      state.profile = action.payload
    })
    builder.addCase(getProfileByIdAsync.fulfilled, (state, action) => {
      state.profile = action.payload
    })

    builder.addCase(updateProfileAsync.pending, (state) => {
      state.loading = true;
      state.isError = false;
    })
    builder.addCase(updateProfileAsync.fulfilled, (state) => {
      state.isError = false;
      state.loading = false;
    })
    builder.addCase(updateProfileAsync.rejected, (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload as string;
      state.loading = false;
    })
  }
})

export default profileSlice.reducer