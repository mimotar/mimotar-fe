export interface IPersistedAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
  base64Url: string;
}

export type IMilestone = {
  id: string;
  name: string;
  deadline: string;
  amount: number;
  files?: IPersistedAttachment[];
};

export type IStepOne = {
  currency: string;
  title: string;
  files: IPersistedAttachment[];
  pay_escrow_fee: "CLIENT" | "FREELANCER" | "BOTH" | null;
  transaction_description: string;
  amount: number;
  deadline: string;
  expiresAt: number | null;
  transactionType:
    | "PHYSICAL_PRODUCT"
    | "ONLINE_PRODUCT"
    | "SERVICE"
    | "RENTAL"
    | "MILESTONE_BASED_PROJECT"
    | ""
    | null;
  inspection_duration: number;
};

export interface ITicket {
  //step one
  currency: string;
  title: string;
  files: IPersistedAttachment[];
  pay_escrow_fee: "CLIENT" | "FREELANCER" | "BOTH" | null;
  transaction_description: string;
  amount: number;
  deadline: string;

  // step two
  milestones: IMilestone[];

  creator_fullname: string;
  creator_email: string;
  creator_no: string;
  creator_address: string;
  // creator_role: "SELLER" | "BUYER" | "" | null;
  creator_role: "CLIENT" | "FREELANCER" | null;

  transactionType:
    | "PHYSICAL_PRODUCT"
    | "ONLINE_PRODUCT"
    | "SERVICE"
    | "RENTAL"
    | "MILESTONE_BASED_PROJECT"
    | ""
    | null;

  inspection_duration: number; // in days
  expiresAt: number | null;
  // pay_shipping_cost: "SELLER" | "BUYER" | "BOTH" | "" | null;
  // additional_agreement: string;

  receiver_fullname: string;
  reciever_email: string;
  receiver_no: string;
  receiver_address: string;
  reciever_role: "CLIENT" | "FREELANCER" | "SELLER" | "BUYER" | null;
  // terms: string;
}
