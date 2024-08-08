export interface User {
  sessionId: string;
  id: string;
  name: string;
  email: string;
  role: string;
  accountId: string;
  password?: string;
}
