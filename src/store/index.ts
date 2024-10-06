import { configureStore } from "@reduxjs/toolkit";
import chatbotReducer from "./chatbotSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
