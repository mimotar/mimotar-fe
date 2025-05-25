import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ITransactionSchema } from "../schemas/CreateTransactionsSchema";
import { ITransaction } from "@/app/types.ts/ICreateTransaction";

const initialState: ITransaction = {
  amount: 0,
  transaction_description: "",
  pay_escrow_fee: "",
  additional_agreement: "",
  pay_shipping_cost: "",
  creator_fullname: "",
  creator_email: "",
  creator_no: "",
  creator_address: "",
  creator_role: "",
  receiver_fullname: "",
  reciever_email: "",
  receiver_no: "",
  receiver_address: "",
  reciever_role: "",
  terms: "",
  transactionType: "",
  inspection_duration: 0,
  expiresAt: null,
};

const createTransactionSlice = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    setTransactionDetails: (
      state,
      action: PayloadAction<Partial<ITransaction>>
    ) => {
      console.log("Setting transaction details:", action.payload);
      return { ...state, ...action.payload };
    },
    resetTransactionDetails: () => initialState,
  },
});

export default createTransactionSlice.reducer;
export const { setTransactionDetails, resetTransactionDetails } =
  createTransactionSlice.actions;
