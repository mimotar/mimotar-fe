export type AuthTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ChangePasswordType = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
