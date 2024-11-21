declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: string;
      NODE_ENV: string;
      CLIENT_ORIGIN: string;
      SUPERT0KENS_DASHBOARD_ADMIN: string;
      SUPERT0KENS_CONNECTION_URI: string;
      SUPERT0KENS_API_KEY: string;
      OAUTH_GOOGLE_CLIENT_ID: string;
      OAUTH_GOOGLE_CLIENT_SECRET: string;
      OAUTH_GITHUB_CLIENT_ID: string;
      OAUTH_GITHUB_CLIENT_SECRET: string;
    }
  }
}

export {};
