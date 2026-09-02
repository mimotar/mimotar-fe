export type WalletBalance = {
  NGN: number;
  USD: number;
};

export type WalletBalancesData = {
  available: WalletBalance;
  locked: WalletBalance;
};

export type WalletBalancesResponse = {
  message: string;
  success: boolean;
  data: WalletBalancesData;
};
