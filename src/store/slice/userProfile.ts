import { createSlice } from "@reduxjs/toolkit";
import { getProfileByIdAsync } from "../async/profile";

const initialState = {
  profile: []
}

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProfileByIdAsync.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  }
})

export default userProfileSlice.reducer