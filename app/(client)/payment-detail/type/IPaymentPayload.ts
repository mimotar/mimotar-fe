export interface FlutterwaveCheckoutResponse {
  status: "success" | "error"; // or you can use: "success" | "error" if you know all possible values
  message: string;
  data: {
    link: string;
  } | null;
}
