export interface DahuaEventRepositoryPort {
  getHandshake(): Promise<string>;
  getTableName(): Promise<string>;
}
