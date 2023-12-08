const { env } = process;

export enum EnvironmentEnum {
  PRD = "prd",
  HML = "hml",
  DEV = "dev",
}

export interface DatabaseSettings {
  dialect: string;
  user: string;
  password: string;
  name: string;
  host: string;
  port: number;
}

export interface ApiSettings {
  port: number;
  environment: EnvironmentEnum;
  db: DatabaseSettings;
}

const environment = Object.values(EnvironmentEnum).some(
  (value) => (value as string) === env.ENVIRONMENT
)
  ? (env.ENVIRONMENT as EnvironmentEnum)
  : EnvironmentEnum.DEV;

const config: ApiSettings = {
  port: parseInt(env.PORT ?? "3000"),
  environment,
  db: {
    dialect: env.DB_DIALECT ?? "postgres",
    user: env.DB_USER ?? "",
    password: env.DB_PASSWORD ?? "",
    name: env.DB_NAME ?? "",
    host: env.DB_HOST ?? "",
    port: parseInt(env.DB_PORT ?? "5432"),
  },
};

export default config;
