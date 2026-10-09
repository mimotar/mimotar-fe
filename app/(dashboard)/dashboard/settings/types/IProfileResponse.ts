export interface ProfileDetail {
  fullName: string;
  email: string;
  phone_no: string;
  phoneVerified: boolean;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  id_number: string;
}

export interface IProfileApiResponse {
  message: string;
  success: boolean;
  data: ProfileDetail;
}
