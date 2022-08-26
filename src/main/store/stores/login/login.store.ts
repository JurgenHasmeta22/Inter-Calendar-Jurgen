import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ILoginRequest from "../../../interfaces/ILoginRequest";

const initialState: ILoginRequest = {
  // userName: "",
  password: "",
  emailLogin: "",
};

const loginStore = createSlice({
  name: "login",

  initialState,

  reducers: {
    // setUserNameLogin(state, action: PayloadAction<string>) {
    //   state.userName = action.payload
    // },

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
  // setUserNameLogin,
  setPasswordLogin,
  setEmailLogin,
} = loginStore.actions;
