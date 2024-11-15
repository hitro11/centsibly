declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDDIT_OAUTH_CLIENT_ID: string;
      REDDIT_OAUTH_SECRET_ID: string;
      CORS_ORIGIN: string;
      HOST: string;
      PORT: string;
      NODE_ENV: string;
      JWT_SECRET_KEY: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};
