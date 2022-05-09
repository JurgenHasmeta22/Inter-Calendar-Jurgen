import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRegister from '../../../interfaces/IRegister';
import IUser from '../../../interfaces/IUser';

const initialState: IUser = {
    firstName: "",
    lastName: "",
    username: "",
    birthdate: "",
    phone: "",
    email: "",
    password: ""
};

const registerStore = createSlice({

  name: 'register',

  initialState,

  reducers: {

    setFirstName(state, action: PayloadAction<string>) {
        state.firstName = action.payload
    },

    setLastName(state, action: PayloadAction<string>) {
        state.lastName = action.payload
    },

    setUserNameRegister(state, action: PayloadAction<string>) {
        state.username = action.payload
    },

    setPasswordRegister(state, action: PayloadAction<string>) {
        state.password = action.payload
    },

    setPhoneNumber(state, action: PayloadAction<string>) {
        state.phone = action.payload
    },

    setEmailRegister(state, action: PayloadAction<string>) {
        state.email = action.payload
    },

    setBirthDate(state, action: PayloadAction<string>) {
        state.birthdate = action.payload
    }

  }

});

export default registerStore;

export const { 
    setFirstName, 
    setLastName, 
    setUserNameRegister, 
    setBirthDate, 
    setEmailRegister, 
    setPasswordRegister, 
    setPhoneNumber 
} = registerStore.actions;