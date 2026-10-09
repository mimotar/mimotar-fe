export interface KycVerificationPayload {
  country:
    | "NG"
    | "GH"
    | "KE"
    | "ZA"
    | "US"
    | "UK"
    | "CA"
    | "AU"
    | "DE"
    | "FR"
    | "AU"
    | "IN";
  channel: "nin" | "bvn" | "passport";
  data: {
    number: string;
  };
}
