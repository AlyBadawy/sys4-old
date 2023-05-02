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
  firstName?: string;
  lastName?: string;
  maxRequests?: number;
  usedRequests?: number;
  canMakeRequests?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  JwtToken?: string;
  isLoggedIn?: boolean;
  currentPassword?: string;
  password?: string;
  passwordConfirmation?: string;
};
