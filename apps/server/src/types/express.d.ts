declare global {
  namespace Express {
    export interface Response {
      locals: {
        user?: {
          id: number;
          name: string;
          email: string;
          accountId: number;
          role: number;
          img?: string | null | undefined;
        };
      };
    }
  }
}
