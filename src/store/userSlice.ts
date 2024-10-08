import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserData } from "../interfaces/userInterfaces";

const initialState: UserData = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  zipCode: "",
  fullAddress: "",
  serviceId: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.fullName = action.payload.fullName;
      state.emailAddress = action.payload.emailAddress;
      state.phoneNumber = action.payload.phoneNumber;
      state.zipCode = action.payload.zipCode;
      state.fullAddress = action.payload.fullAddress;
      state.serviceId = action.payload.serviceId;
    },
    setServiceId(state, action: PayloadAction<{ serviceId: number }>) {
      state.serviceId = action.payload.serviceId; // Update the serviceId in the state
    },
  },
});

export const { setUserData, setServiceId } = userSlice.actions;

export default userSlice.reducer;
