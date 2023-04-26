export type UserLoginData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type User = {
  id?: string;
  email?: string;
  unconfirmedEmail?: string;
  JwtToken?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  currentPassword?: string;
  password?: string;
  passwordConfirmation?: string;
};
