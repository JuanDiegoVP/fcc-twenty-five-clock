import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 1500,
  running: false,
  sessionRunning: true,
  breakRunning: false,
  slength: 1500,
  blength: 300,
  play: false,
  pause: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    setTime: (state) => {
      if (state.time === 0 && state.sessionRunning) {
        state.play = true;
        state.breakRunning = true;
        state.sessionRunning = false;
        state.time = state.blength;
      } else if (state.time === 0 && state.breakRunning) {
        state.play = true;
        state.breakRunning = false;
        state.sessionRunning = true;
        state.time = state.slength;
      } else {
        state.play = false;
        state.pause = false;
        state.time -= 1;
      }
    },
    setRunning: (state) => {
      state.running = !state.running;
    },
    setReset: (state) => {
      state.time = 1500;
      state.running = false;
      state.sessionRunning = true;
      state.breakRunning = false;
      state.slength = 1500;
      state.blength = 300;
      state.play = false;
      state.pause = true;
    },
    setBreakDecrement: (state) => {
      if (!state.running) {
        if (state.breakRunning) {
          if (state.blength > 60) {
            state.time = state.blength - 60;
            state.blength -= 60;
          }
        }
        if (state.sessionRunning) {
          if (state.blength > 60) {
            state.blength -= 60;
          }
        }
      }
    },
    setBreakIncrement: (state) => {
      if (!state.running) {
        if (state.breakRunning) {
          if (state.blength < 3600) {
            state.time = state.blength + 60;
            state.blength += 60;
          }
        }
        if (state.sessionRunning) {
          if (state.blength < 3600) {
            state.blength += 60;
          }
        }
      }
    },
    setSessionDecrement: (state) => {
      if (!state.running) {
        if (state.sessionRunning) {
          if (state.slength > 60) {
            state.time = state.slength - 60;
            state.slength -= 60;
          }
        }
        if (state.breakRunning) {
          if (state.slength > 60) {
            state.slength -= 60;
          }
        }
      }
    },
    setSessionIncrement: (state) => {
      if (!state.running) {
        if (state.sessionRunning) {
          if (state.slength < 3600) {
            state.time = state.slength + 60;
            state.slength += 60;
          }
        }
        if (state.breakRunning) {
          if (state.slength < 3600) {
            state.slength += 60;
          }
        }
      }
    },
  },
});

export const {
  setTime,
  setRunning,
  setReset,
  setBreakDecrement,
  setBreakIncrement,
  setSessionDecrement,
  setSessionIncrement,
} = timerSlice.actions;
export default timerSlice.reducer;
