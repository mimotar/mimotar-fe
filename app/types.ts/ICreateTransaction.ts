export interface ITransaction {
  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  creator_role: "SELLER" | "BUYER" | "" | null;

  amount: number;
  transaction_description: string;
  attachment: File[] | File | FileList | null;
  transactionType:
    | "PHYSICAL_PRODUCT"
    | "ONLINE_PRODUCT"
    | "SERVICE"
    | ""
    | null;

  pay_escrow_fee: "SELLER" | "BUYER" | "BOTH" | "" | null;
  inspection_duration: number; // in days
  expiresAt: number | null;
  pay_shipping_cost: "SELLER" | "BUYER" | "BOTH" | "" | null;
  additional_agreement: string;

  receiver_fullname: string;
  reciever_email: string;
  receiver_no: string;
  receiver_address: string;
  reciever_role: "SELLER" | "BUYER" | "" | null;
  terms: string;
}
