import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: null,
  nameuser: "",
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setid: (state, action) => {
      state.id = action.payload;
    },
    setuser: (state, action) => {
      state.nameuser = action.payload;
    },
  },
});
export default globalSlice.reducer;
export const { setid, setuser } = globalSlice.actions;
