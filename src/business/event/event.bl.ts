import { Injectable } from '@nestjs/common';
import { Events } from 'src/schemas/events/event.shema';
import { EventProvider } from 'src/providers/events/event.provider';
import { EventDTO, CreateEventDTO } from 'src/schemas/events/event.DTO';

@Injectable()
export class EventBusiness {
  constructor(private readonly provider: EventProvider) {}

  async createEvent(event: EventDTO): Promise<Events> {
    return this.provider.newEvent(event) as unknown as Promise<Events>;
  }

  async getAll(): Promise<Events[]> {
    return this.provider.getAll() as unknown as Promise<Events[]>;
  }

  async getByChurchId(churchId: string): Promise<Events[]> {
    return this.provider.getByChurchId(churchId) as unknown as Promise<Events[]>;
  }

  async addBooking(newBooking: CreateEventDTO, eventId: string): Promise<Events> {
    return this.provider.addBooking(newBooking, eventId) as unknown as Promise<Events>;
  }

  async updateBooking(bookingId:string, newStatus:string): Promise<boolean> {
    return this.provider.updateBooking(bookingId, newStatus) as unknown as Promise<boolean>;
  }
}
