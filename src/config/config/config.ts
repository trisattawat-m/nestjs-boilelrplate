require('dotenv').config();

export class PostgresConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;

  constructor() {
    this.host = process.env.POSTGRES_HOST || 'postgres';
    this.port = process.env.POSTGRES_PORT || '5432';
    this.user = process.env.POSTGRES_USERNAME || 'postgres';
    this.password = process.env.POSTGRES_PASSWORD || 'password';
    this.database = process.env.POSTGRES_DB || 'master';
  }
}
