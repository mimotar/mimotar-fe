import { createSlice } from "@reduxjs/toolkit";

type transactionalDetail = {
  amount: number;
  description: string;
  transactionType: string;
};

type TermAndAgreement = {
  whoPayEscrowFee: string;
  inspectionPeriod: string;
  whoPayShippingCost: string;
  additionalAgreements: string;
};
type SecondTransactorInfo = {
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  Option: "buyer" | "seller";
};

type initialStateType = {
  transactionalDetail: transactionalDetail;
  termAndAgreement: TermAndAgreement;
  secondTransactorInfo: SecondTransactorInfo;
};

const initialState: initialStateType = {
  transactionalDetail: {
    amount: 0,
    description: "",
    transactionType: "",
  },
  termAndAgreement: {
    whoPayEscrowFee: "",
    inspectionPeriod: "",
    whoPayShippingCost: "",
    additionalAgreements: "",
  },
  secondTransactorInfo: {
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
    Option: "buyer",
  },
};

const createTransactionProcessDataSlice = createSlice({
  name: "createTransactionProcessData",
  initialState,
  reducers: {
    setTransactionalDetail: (state, action) => {
      state.transactionalDetail = action.payload;
    },
    setTermAndAgreement: (state, action) => {
      state.termAndAgreement = action.payload;
    },
    setSecondTransactorInfo: (state, action) => {
      state.secondTransactorInfo = action.payload;
    },
  },
});

export const {
  setTransactionalDetail,
  setTermAndAgreement,
  setSecondTransactorInfo,
} = createTransactionProcessDataSlice.actions;
export default createTransactionProcessDataSlice.reducer;
