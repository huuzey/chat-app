import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../api/contexts.js";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
export default store;
