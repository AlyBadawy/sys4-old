export type Session = {
  id: string;
  createdAt: Date;
  exp: Date;
  jti: string;
  valid: boolean;
  agent: string;
  deviceType: string;
  ip: string;
  location?: string;
  url: string;
  current: boolean;
};
