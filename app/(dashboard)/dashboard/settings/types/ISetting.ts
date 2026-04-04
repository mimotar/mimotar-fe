export type Currency = "NGN" | "USD" | "GBP";
export type NotificationPreference = "SMS" | "EMAIL" | "BOTH";
export type AccountStatus = "ACTIVE" | "SUSPENDED" | "DISABLED"; // extend if needed

export interface UserSettings {
  id: number;
  user_id: number;
  defaultCurrency: Currency;
  notificationPreference: NotificationPreference;
  securityQuestions: string[];
  twoFactorAuth: boolean;
  accountStatus: AccountStatus;
}

export interface GetSettingsResponse {
  message: string;
  data: UserSettings | null;
  success: boolean;
}
