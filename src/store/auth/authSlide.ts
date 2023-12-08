import { createSlice } from "@reduxjs/toolkit";

const MOCK_USER = {
  id: 1,
  name: "Mock User",
  email: "mockUser@mail.com",
};

type IUser = typeof MOCK_USER;

type AuthState = {
  isLoggedin: boolean;
  user: IUser | null;
};

const initialState: AuthState = {
  isLoggedin: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isLoggedin = true;
      state.user = MOCK_USER;
    },
    signOut: (state) => {
      state.isLoggedin = false;
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
