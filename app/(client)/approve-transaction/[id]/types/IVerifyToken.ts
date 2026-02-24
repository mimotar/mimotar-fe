export interface IVerifyTokenResponse {
  status: 200;
  message: string;
  data: {
    creator_email: string;
    reciever_email: string;
    transaction_id: number;
    iat: number;
    exp: number;
  };
  success: true;
}
