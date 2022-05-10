import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRegister from '../../../interfaces/IRegister';
import IUser from '../../../interfaces/IUser';

const initialState: IUser = {
    firstName: "",
    lastName: "",
    userName: "",
    bio: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    avatar: "",
    isDoctor: "false"
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
        state.userName = action.payload
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

    setBio(state, action: PayloadAction<string>) {
        state.bio = action.payload
    },

    setAddress(state, action: PayloadAction<string>) {
        state.address = action.payload
    },

    setIsDoctor(state, action: PayloadAction<string>) {
        state.isDoctor = action.payload
    },

    setAvatar(state, action: PayloadAction<string>) {
        state.avatar = action.payload
    }

  }

});

export default registerStore;

export const { 
    setFirstName, 
    setLastName, 
    setUserNameRegister, 
    setAddress,
    setBio,
    setIsDoctor,
    setEmailRegister, 
    setPasswordRegister, 
    setPhoneNumber,
    setAvatar
} = registerStore.actions;