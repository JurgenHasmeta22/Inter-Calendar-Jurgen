import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAppointement from '../../../interfaces/IAppointement';
import IEvent from '../../../interfaces/IEvent';
import IDashboard from "../../../interfaces/IProfile"
import IUser from '../../../interfaces/IUser';

const initialState: IDashboard = {
    appointements: [],
    modal: "",
    eventsNew: [],
    doctors: [],
    selectedDoctorName: "",
    selectedDoctor: null
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

    setModal(state, action: PayloadAction<string>) {
      state.modal = action.payload
    },

    invalidateModal(state) {
      state.modal = ""
    },

    setEventsNew(state, action: PayloadAction<IEvent[]>) {
      state.eventsNew = action.payload
    },

    setDoctors(state, action: PayloadAction<IUser[]>) {
      state.doctors = action.payload
    },

    invalidateDoctors(state) {
      state.doctors = []
    },

    setSelectedDoctorName(state, action: PayloadAction<string>) {
      state.selectedDoctorName = action.payload
    },

    setSelectedDoctor(state, action: PayloadAction<IUser>) {
      state.selectedDoctor= action.payload
    }

  }
  
});

export default dashboardStore;

export const { 
  setAppointements, 
  invalidateAppointements,
  setModal,
  setEventsNew,
  setDoctors,
  invalidateDoctors,
  setSelectedDoctorName,
  setSelectedDoctor,
  invalidateModal
} = dashboardStore.actions;