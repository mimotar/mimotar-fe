export type ITicketToken = {
  id: string;
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
  created_at: string; // ISO timestamp string
  inspection_duration: number;
  reciever_role: "BUYER" | "SELLER"; // assuming roles are enums
  terms: string;
  transactionType: "PHYSICAL_PRODUCT" | "ONLINE_PRODUCT" | "SERVICE";

  transaction_description: string;
  pay_escrow_fee: "SELLER" | "BUYER" | "BOTH";
  pay_shipping_cost: "SELLER" | "BUYER" | "BOTH";
  creator_role: "BUYER" | "SELLER";
  status: "CREATED" | string;
  currency: string;
  expiresAt: string; // ISO timestamp string
  transactionToken: string;
  reciever_email: string;
  approveStatus: boolean;
  otp: string;
  otp_created_at: string; // ISO timestamp string
  files: any | null; // define more specifically if known
  payment_id: number | null;
};
