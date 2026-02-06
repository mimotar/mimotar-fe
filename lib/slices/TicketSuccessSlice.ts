import { ITicketSuccessPayload } from "@/app/types.ts/ITicketSuccessPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITicketSuccessPayload = {
  id: 0,
  amount: 0,
  user_id: 0,
  additional_agreement: "",
  creator_fullname: "",
  creator_email: "",
  creator_no: "",
  creator_address: "",
  receiver_fullname: "",
  receiver_no: "",
  receiver_address: "",
  link_expires: false,
  txn_link: "",
  created_at: "",
  inspection_duration: 0,
  reciever_role: "",
  terms: "",
  transactionType: "",
  transaction_description: "",
  pay_escrow_fee: "",
  pay_shipping_cost: "",
  creator_role: "",
  status: "",
  currency: "",
  expiresAt: "",
  transactionToken: "",
  reciever_email: "",
  approveStatus: false,
  otp: null,
  otp_created_at: null,
  files: null,
  payment_id: null,
};

const TicketSuccessSlice = createSlice({
  name: "TicketSuccess",
  initialState,
  reducers: {
    createTicketSuccessPayload: (
      state,
      action: PayloadAction<ITicketSuccessPayload>
    ) => {
      return action.payload;
    },
    resetTicketSuccessPayload: () => initialState,
  },
});

export const { createTicketSuccessPayload, resetTicketSuccessPayload } =
  TicketSuccessSlice.actions;
export default TicketSuccessSlice.reducer;
