import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IModal from "../../../interfaces/IModal";

const initialState: IModal = {
  price: 0,
  title: "",
  description: "",
  doctor_id: null,
  user_id: null,
  category_id: null,
  startDate: "",
  endDate: "",
};

const modalsStore = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.category_id = action.payload;
    },
    setDoctorId(state, action: PayloadAction<number>) {
      state.doctor_id = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.user_id = action.payload;
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
  },
});

export default modalsStore;

export const {
  setTitle,
  setDescription,
  setStartDate,
  setCategoryId,
  setDoctorId,
  setUserId,
  setEndDate,
  setPrice,
} = modalsStore.actions;
