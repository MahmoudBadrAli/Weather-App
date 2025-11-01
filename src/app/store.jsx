import { configureStore } from "@reduxjs/toolkit";
import weatherApiReducer from "../features/api/weatherApiSlice";

export default configureStore({
  reducer: {
    weatherApi: weatherApiReducer,
  },
});
