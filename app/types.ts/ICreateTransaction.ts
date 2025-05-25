export interface ITransaction {
  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  creator_role: "SELLER" | "BUYER" | "" | null;

  amount: number;
  transaction_description: string;
  pay_escrow_fee: "SELLER" | "BUYER" | "BOTH" | "" | null;
  additional_agreement: string;
  pay_shipping_cost: "SELLER" | "BUYER" | "BOTH" | "" | null;

  receiver_fullname: string;
  reciever_email: string;
  receiver_no: string;
  receiver_address: string;
  reciever_role: "SELLER" | "BUYER" | "" | null;
  terms: string;
  transactionType:
    | "PHYSICAL_PRODUCT"
    | "DIGITAL_PRODUCT"
    | "SERVICE"
    | ""
    | null;
  inspection_duration: number; // in days
  expiresAt: Date | null; // in days or a timestamp depending on usage
}
