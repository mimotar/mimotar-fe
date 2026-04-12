export type UserProfile = {
  fullName: string;
  email: string;
  phone_no: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  id_number: number | null;
  avatar: string;
};

type ApiResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};

export type UpdateProfileResponse = ApiResponse<UserProfile>;
