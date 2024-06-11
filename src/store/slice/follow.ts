import { createSlice } from "@reduxjs/toolkit";
import { getFollowerAsync, getFollowingAsync } from "../async/follow";

const initialState = {
  follow: []
}

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFollowingAsync.fulfilled, (state, action) => {
      state.follow = action.payload
    })
    builder.addCase(getFollowerAsync.fulfilled, (state, action) => {
      state.follow = action.payload
    })
  }
})

export default followSlice.reducer