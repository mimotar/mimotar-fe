export interface IPersistedAttachment {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  dataUrl: string;
}

export interface ITicket {
  currency: string;
  title: string;
  attachment: IPersistedAttachment[];
  pay_escrow_fee: "CLIENT" | "FREELANCER" | "BOTH" | null;
  transaction_description: string;
  amount: number;
  close_deadline: string;

  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  creator_role: "SELLER" | "BUYER" | "" | null;

  transactionType:
    | "PHYSICAL_PRODUCT"
    | "ONLINE_PRODUCT"
    | "SERVICE"
    | ""
    | null;

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
