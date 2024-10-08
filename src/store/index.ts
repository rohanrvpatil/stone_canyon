import { configureStore } from "@reduxjs/toolkit";

import chatbotReducer from "./chatbotSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
