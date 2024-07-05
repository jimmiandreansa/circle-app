import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "@/type/app";
import {
  createThreadAsync,
  getMyThreadAsync,
  getThreadAsync,
  getThreadByIdAsync,
  getThreadReplyAsync,
} from "../async/thread";

interface IInitialState {
  threads: IThread[];
  myThreads: IThread[];
  reply: IThread[];
  userThreads: IThread[];
  loading: boolean;
  errorMessage: string;
  successMessage: string;
  isError: boolean;
}

const initialState: IInitialState = {
  threads: [],
  myThreads: [],
  reply: [],
  userThreads: [],
  loading: false,
  errorMessage: "",
  successMessage: "",
  isError: false,
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createThreadAsync.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(createThreadAsync.fulfilled, (state) => {
      state.isError = false;
      state.loading = false;
      state.successMessage = "Thread created successfully!";
    });
    builder.addCase(createThreadAsync.rejected, (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload as string;
      state.loading = false;
    });

    builder.addCase(getThreadAsync.fulfilled, (state, action) => {
      state.threads = action.payload;
    });
    builder.addCase(getMyThreadAsync.fulfilled, (state, action) => {
      state.myThreads = action.payload;
    });
    builder.addCase(getThreadReplyAsync.fulfilled, (state, action) => {
      state.reply = action.payload;
    });
    builder.addCase(getThreadByIdAsync.fulfilled, (state, action) => {
      state.userThreads = action.payload;
    });
  },
});

export default threadSlice.reducer;
