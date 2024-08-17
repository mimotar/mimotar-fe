import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../types/userType";

interface initialStateType {
  user: userType | null;
}
const initialState: initialStateType = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const getUser = (state: any) => state.user.user;
export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
