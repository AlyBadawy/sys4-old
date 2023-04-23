export type UserLoginData = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  admin: boolean;
  JwtToken?: string;
};
