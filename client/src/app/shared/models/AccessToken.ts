export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expiry?: number;
  refresh_token: string;
  scope: string;
}
