import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialState = {
  stage: number;
  isOpen: boolean;
};
const initialState: initialState = {
  stage: 0,
  isOpen: false,
};

const createTransactionStateSlice = createSlice({
  name: "createTransaction",
  initialState: initialState,
  reducers: {
    setStage: (state, action: PayloadAction<number>) => {
      state.stage = action.payload;
    },

    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setStage, setIsOpen } = createTransactionStateSlice.actions;
export default createTransactionStateSlice.reducer;
