import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/auth";
import threadReducer from "./slice/thread";
import profileReducer from "./slice/profile";
import followReducer from "./slice/follow";
import userReducer from "./slice/user";
import likeReducer from "./slice/like";
import userProfileReducer from "./slice/userProfile";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    profile: profileReducer,
    follow: followReducer,
    user: userReducer,
    like: likeReducer,
    userProfile: userProfileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
