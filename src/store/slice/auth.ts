import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "@/type/app";
import { loginAsync, getProfileAsync, registerAsync} from "../async/auth";

interface IAuthState {
  token: string;
  user: IProfile | null | undefined;
  loading: boolean;
  errorMessage: string;
  isError: boolean;
}

const initialState: IAuthState = {
  token: "",
  user: undefined,
  loading: false,
  errorMessage: "",
  isError: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    SET_LOGIN: (
      state,
      action: PayloadAction<{ user: IProfile; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    SET_LOGOUT: () => {
      localStorage.removeItem("token");
      // state.user = undefined;
      // state.token = "";
    },
    SET_AUTH_CHECK: (
      state,
      action: PayloadAction<{ user?: IProfile; token: string }>
    ) => {
      // console.log("SET_AUTH_CHECK", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    SET_AUTH_ERROR: () => {
      localStorage.removeItem("token");
      // state.user = undefined;
      // state.token = "";
    },
  },
  extraReducers(builder) {
    // login
    builder.addCase(loginAsync.pending, (state) => {
      state.token = "";
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.token = "";
      state.errorMessage = action.payload as string;
    });

    // register
    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(registerAsync.fulfilled, (state) => {
      // console.log(action.payload);
      state.loading = false;
      state.isError = false;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload as string;
      state.isError = true;
    });

    // getProfile
    builder.addCase(getProfileAsync.pending, (state) => {
      state.user = undefined;
      state.loading = true;
    });
    builder.addCase(getProfileAsync.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getProfileAsync.rejected, (state, action) => {
      state.loading = false;
      state.user = undefined;
      state.token = "";
      state.errorMessage = action.payload as string;
    });
  },
});

export const { SET_LOGIN, SET_LOGOUT, SET_AUTH_CHECK, SET_AUTH_ERROR } = counterSlice.actions;
export default counterSlice.reducer;
