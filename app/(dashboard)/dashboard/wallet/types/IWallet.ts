export type WalletBalancesResponse = {
  message: string;
  success: boolean;
  data: {
    available: {
      NGN: number;
      USD: number;
    };
    locked: {
      NGN: number;
      USD: number;
    };
  };
};
