import { DahuaEventRepositoryPort } from './dahua-event.repository.port';

export class DahuaEventRepository implements DahuaEventRepositoryPort {
  constructor() {}

  async getHandshake(): Promise<string> {
    return 'Handshake successful';
  }
}
