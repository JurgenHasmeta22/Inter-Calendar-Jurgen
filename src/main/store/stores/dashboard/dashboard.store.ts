import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAppointement from '../../../interfaces/IAppointement';
import IEvent from '../../../interfaces/IEvent';
import IDashboard from "../../../interfaces/IProfile"

const initialState: IDashboard = {
    appointements: [],
    openModal: false,
    eventsNew: []
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
    },

    setOpen(state, action: PayloadAction<boolean>) {
      state.openModal = action.payload
    },

    setEventsNew(state, action: PayloadAction<IEvent[]>) {
      state.eventsNew = action.payload
    }

  }
  
});

export default dashboardStore;

export const { 
  setAppointements, 
  invalidateAppointements,
  setOpen,
  setEventsNew
} = dashboardStore.actions;