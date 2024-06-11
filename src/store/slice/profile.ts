import { createSlice } from "@reduxjs/toolkit";
import { getMyProfileAsync, getProfileByIdAsync } from "../async/profile";

const initialState = {
  profile: []
}

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
  }
})

export default profileSlice.reducer