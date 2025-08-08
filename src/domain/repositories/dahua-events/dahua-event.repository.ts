import { PostgresConfig } from '@config/config/config';
import { DahuaEventRepositoryPort } from './dahua-event.repository.port';

export class DahuaEventRepository implements DahuaEventRepositoryPort {
  private readonly tableName: string;

  constructor(
    private readonly _config: PostgresConfig,
    tableName: string = 'dahua_event_table',
  ) {
    this.tableName = tableName;
  }

  async getHandshake(): Promise<string> {
    return 'Handshake successful';
  }

  async getTableName(): Promise<string> {
    return this.tableName;
  }
}
