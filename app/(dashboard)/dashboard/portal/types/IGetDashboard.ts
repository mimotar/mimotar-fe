export type ITransactionCount = {
  ongoing: number;
  cancelled: number;
  completed: number;
};

export type DashboardSummaryResponse = {
  message: string;
  success: boolean;
  data: {
    escrowBalance: number;
    totalTransactions: number;
    openDisputes: number;
    transactionCount: ITransactionCount;
    amountPerPeriod: Record<string, number>;
  };
};
