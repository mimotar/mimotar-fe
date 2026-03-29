export type TransactionStatus = "CREATED" | "APPROVED" | "REJECTED" | "ONGOING";

export type ITransaction = {
  id: number;
  receiver_fullname: string;
  reciever_email: string; // note: API typo preserved
  creator_email: string;
  created_at: string; // ISO date string
  transactionToken: string;
  txn_link: string;
  amount: number;
  transaction_description: string;
  files: string | null;
  status: TransactionStatus;
};

export type TransactionsResponse = {
  message: string;
  data: ITransaction[];
};
