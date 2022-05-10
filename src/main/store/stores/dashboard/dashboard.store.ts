import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAppointement from '../../../interfaces/IAppointement';
import IDashboard from "../../../interfaces/IProfile"

const initialState: IDashboard = {
    appointements: []
}

const dashboardStore = createSlice({

  name: 'dashboard',

  initialState,
  
  reducers: {

    setAppointements(state, action: PayloadAction<IAppointement[]>) {
        state.appointements = action.payload
    },

    invalidateAppointements(state) {
      state.appointements = []
    }

  }
  
});

export default dashboardStore;

export const { setAppointements, invalidateAppointements } = dashboardStore.actions;