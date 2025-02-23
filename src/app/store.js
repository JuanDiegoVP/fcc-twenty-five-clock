import { configureStore } from "@reduxjs/toolkit";

//Reducers
import modeReducer from "../reducer/mode/modeSlice";
import timerReducer from "../reducer/timer/timerSlice";

export default configureStore({
  reducer: {
    mode: modeReducer,
    timer: timerReducer,
  },
});
