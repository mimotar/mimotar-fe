export type ITransaction = {
  id: number;
  receiver_fullname: string;
  reciever_email: string;
  creator_email: string;
  created_at: string; // ISO timestamp
  transactionToken: string;
  txn_link: string;
  amount: number;
  transaction_description: string;
  files: null | any; // adjust if you later expect files to be objects or arrays
  status: "CREATED" | "PENDING" | "APPROVED" | "REJECTED"; // enum-like union (adjust as needed)
};

// export type TransactionList = Transaction[];
