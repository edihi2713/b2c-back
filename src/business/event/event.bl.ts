import { Injectable } from '@nestjs/common';
import { Events } from 'src/schemas/events/event.shema';
import { EventProvider } from 'src/providers/events/event.provider';
import { EventDTO } from 'src/schemas/events/event.DTO';

@Injectable()
export class EventBusiness {
  constructor(private readonly provider: EventProvider) {}

  async createEvent(event: EventDTO): Promise<Events> {
    return this.provider.newEvent(event) as unknown as Promise<Events>;
  }

  async getAll(): Promise<Events[]> {
    return this.provider.getAll() as unknown as Promise<Events[]>;
  }
}
