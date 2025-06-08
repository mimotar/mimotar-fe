export type ITicketSuccessPayload = {
  id: number;
  amount: number;
  user_id: number;
  additional_agreement: string;
  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  receiver_fullname: string;
  receiver_no: string;
  receiver_address: string;
  link_expires: boolean;
  txn_link: string;
  created_at: string; // ISO date string
  inspection_duration: number;
  reciever_role: "BUYER" | "SELLER" | string;
  terms: string;
  transactionType: "PHYSICAL_PRODUCT" | "DIGITAL_PRODUCT" | string; // Extend as needed
  transaction_description: string;
  pay_escrow_fee: "BUYER" | "SELLER" | "BOTH" | string;
  pay_shipping_cost: "BUYER" | "SELLER" | "BOTH" | string;
  creator_role: "BUYER" | "SELLER" | string;
  status: "CREATED" | "COMPLETED" | "CANCELLED" | string; // Extend as needed
  currency: string;
  expiresAt: string; // ISO date string
  transactionToken: string;
  reciever_email: string;
  approveStatus: boolean;
  otp: string | null;
  otp_created_at: string | null;
  files: string | null;
  payment_id: number | null;
};
