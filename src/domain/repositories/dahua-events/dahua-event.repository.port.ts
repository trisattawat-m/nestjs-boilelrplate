export interface DahuaEventRepositoryPort {
  getHandshake(): Promise<string>;
}
