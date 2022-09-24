import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ILoginRequest from "../../../interfaces/ILoginRequest";

const initialState: ILoginRequest = {
  password: "",
  emailLogin: "",
};

const loginStore = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPasswordLogin(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },

    setEmailLogin(state, action: PayloadAction<string>) {
      state.emailLogin = action.payload;
    },
  },
});

export default loginStore;

export const {
  setPasswordLogin,
  setEmailLogin,
} = loginStore.actions;
