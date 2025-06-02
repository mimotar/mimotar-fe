import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ITransactionSchema } from "../schemas/CreateTransactionsSchema";
import { ITransaction } from "@/app/types.ts/ICreateTransaction";

const initialState: ITransaction = {
  creator_fullname: "",
  creator_email: "",
  creator_no: "",
  creator_address: "",
  creator_role: "",

  amount: 0,
  transaction_description: "",
  attachment: null,
  transactionType: "",

  pay_escrow_fee: "",
  inspection_duration: 0,
  pay_shipping_cost: "",
  additional_agreement: "",

  receiver_fullname: "",
  reciever_email: "",
  receiver_no: "",
  receiver_address: "",
  reciever_role: "",
  terms: "",
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
