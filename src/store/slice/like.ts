import { createSlice } from "@reduxjs/toolkit"
import { getLikeAsync } from "../async/like"

const initialState = {
  likes: []
}

const profileSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLikeAsync.fulfilled, (state, action) => {
      state.likes = action.payload
    })
  }
})

export default profileSlice.reducer