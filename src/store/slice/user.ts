import { IUser } from "@/type/app"
import { createSlice } from "@reduxjs/toolkit"
import { getUserSuggestAsync } from "../async/user"

interface IInitialState {
  users: IUser[]
}

const initialState: IInitialState = {
  users: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserSuggestAsync.fulfilled, (state, action) => {
      state.users = action.payload
    })
  }
})

export default userSlice.reducer