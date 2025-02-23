import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkModeColor: {
    pageBackground: "bg-[#1c1c1c]",
    containerBackground: "bg-[#242424]",
    componentBackground: "bg-[#303030]",
    greenText: "text-[#31b95b]",
    blueText: "text-[#32acdb]",
    mainText: "text-[#efefef]",
    redText: "text-[#b93131]",
    grayText: "text-[#6c6c6c]",
    navbarBorder: "border-[#202020]",
    greenHover: "hover:text-[#31b95b]",
    redHover: "hover:text-[#b93131]",
  },
  lightModeColor: {
    pageBackground: "bg-[#cfcdcd]",
    containerBackground: "bg-[#ffffff]",
    componentBackground: "bg-[#bebebe]",
    greenText: "text-[#21823f]",
    blueText: "text-[#1b7ea4]",
    mainText: "text-[#3c3c3c]",
    redText: "text-[#b93131]",
    grayText: "text-[#6c6c6c]",
    navbarBorder: "border-[#cccccc]",
    greenHover: "hover:text-[#21823f]",
    redHover: "hover:text-[#b93131]",
  },
  mode: true,
  color: {
    pageBackground: "bg-[#cfcdcd]",
    containerBackground: "bg-[#ffffff]",
    componentBackground: "bg-[#bebebe]",
    greenText: "text-[#21823f]",
    blueText: "text-[#1b7ea4]",
    mainText: "text-[#3c3c3c]",
    redText: "text-[#b93131]",
    grayText: "text-[#6c6c6c]",
    navbarBorder: "border-[#cccccc]",
    greenHover: "hover:text-[#21823f]",
    redHover: "hover:text-[#b93131]",
  },
};

export const modeSlice = createSlice({
  name: "mode",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = !state.mode;
      if (state.mode) {
        state.color = state.lightModeColor;
      } else {
        state.color = state.darkModeColor;
      }
    },
  },
});

export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;
