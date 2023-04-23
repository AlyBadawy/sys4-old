export type Session = {
  id: string;
  createdAt: Date;
  exp: Date;
  tji: string;
  valid: boolean;
  agent: string;
  ip: string;
  location?: string;
  url: string;
  current: boolean;
};
