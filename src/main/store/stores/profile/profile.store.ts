import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProfile from "../../../interfaces/IProfile"
import ITransaction from '../../../interfaces/ITransaction';

const initialState: IProfile = {
    transactions: []
}

const profileStore = createSlice({

  name: 'profile',

  initialState,
  
  reducers: {

    setTransactions(state, action: PayloadAction<ITransaction[]>) {
        state.transactions = action.payload
    },

    invalidateTransactions(state) {
      state.transactions = []
    }

  }
  
});

export default profileStore;

export const { setTransactions, invalidateTransactions } = profileStore.actions;