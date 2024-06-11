import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getThreadByUserId,
  getThreads,
  getReplies,
  getThreadById,
  createThread,
} from "@/libs/api/call/thread";

export const createThreadAsync = createAsyncThunk(
  "thread/createThread",
  async (
    body: {
      content: string;
      image: FileList | null;
      threadId?: number;
    },
    thunkAPI
  ) => {
    try {
      await createThread(body);
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { data: { message: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getThreadAsync = createAsyncThunk("thread/getThread", async () => {
  try {
    const threadRes = await getThreads();

    return threadRes.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getMyThreadAsync = createAsyncThunk(
  "thread/getMyThread",
  async (userId: number) => {
    try {
      const threadRes = await getThreadByUserId(userId);

      return threadRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getThreadByIdAsync = createAsyncThunk(
  "thread/getThreadByThread",
  async (threadId: number) => {
    try {
      const threadRes = await getThreadById(threadId);

      return threadRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getThreadReplyAsync = createAsyncThunk(
  "thread/getReplies",
  async (threadId: number) => {
    try {
      const replyRes = await getReplies(threadId);

      return replyRes.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
