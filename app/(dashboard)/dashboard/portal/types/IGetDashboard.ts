// export type ITransactionCount = {
//   ongoing: number;
//   cancelled: number;
//   completed: number;
// };

import { TransactionStatus } from "../../projects/types/ITransaction";

// export type DashboardSummaryResponse = {
//   message: string;
//   success: boolean;
//   data: {
//     escrowBalance: number;
//     totalTransactions: number;
//     openDisputes: number;
//     transactionCount: ITransactionCount;
//     amountPerPeriod: Record<string, number>;
//   };
// };

export interface DashboardSummaryResponse {
  message: string;
  success: boolean;
  data: DashboardSummary;
}

export interface DashboardSummary {
  escrowBalance: number;
  totalTransactions: number;
  openDisputes: number;

  transactionCount: {
    ongoing: number;
    cancelled: number;
    completed: number;
  };

  amountPerPeriod: Record<string, number>;

  balance: IWallet;

  actionsRequired: {
    count: number;
    items: ActionRequiredItem[];
  };

  activeContracts: ActiveContract[];

  recentActivity: RecentActivity[];
}

export interface IWallet {
  availableWithdrawable: {
    NGN: number;
    USD: number;
  };
  lockedEscrow: {
    NGN: number;
    USD: number;
  };
}

export interface ActionRequiredItem {
  transactionId: number;
  title: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  from: {
    name: string;
    email: string;
  };
  createdAt: string;
  type: string;
}

export interface RecentActivity {
  id: number;
  title: string;
  description: string;
  time: string;
}

export interface ActiveContract {
  id: number;
  title: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  deadline: string;
  counterparty: {
    name: string;
    email: string;
  };
  paymentSentToEscrowAt: string;
  activeMilestone: {
    id: number;
    name: string;
    amount: number;
    status: string;
  } | null;
}
