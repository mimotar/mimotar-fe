export type ITicket = {
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
  created_at: string; // ISO date string
  inspection_duration: number;
  reciever_role: "BUYER" | "SELLER"; // assuming fixed roles
  terms: string;
  transactionType: "PHYSICAL_PRODUCT" | "ONLINE_PRODUCT" | "SERVICE";
  transaction_description: string;
  pay_escrow_fee: "SELLER" | "BUYER" | "BOTH"; // assuming these are the only options
  pay_shipping_cost: "SELLER" | "BUYER" | "BOTH"; // assuming these are the only options
  creator_role: "BUYER" | "SELLER"; // same assumption
  status:
    | "CREATED"
    | "APPROVED"
    | "ONGOING"
    | "COMPLETED"
    | "DISPUTE"
    | "REJECTED"
    | "CANCELED"
    | "EXPIRED"; // extend with other status values as needed
  currency: string;
  expiresAt: string; // ISO date string
  transactionToken: string;
  reciever_email: string;
  approveStatus: boolean;
  files: any | null; // adjust type if files are structured
  payment_id: number | null;
};
