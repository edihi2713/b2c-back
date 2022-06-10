import { Injectable } from '@nestjs/common';
import { Attendee } from 'src/schemas/attendee/attendee.schema';
import { AttendeeProvider } from 'src/providers/attendee/attendee.provider';
import { AttendeeDTO } from 'src/schemas/attendee/attendee.DTO';


@Injectable()
export class AttendeeBusiness {
  constructor(private readonly provider: AttendeeProvider) {}


  async getAllAttendee(): Promise<Attendee[]> {
    return this.provider.getAllAttendee() as unknown as Promise<Attendee[]>;
  }

  async getAllAttendeeByDocumentNumber(documentNumber: string): Promise<Attendee[]> {
    return this.provider.getAllAttendeeByDocumentNumber(documentNumber) as unknown as Promise<Attendee[]>;
  }

  async create(attendee: AttendeeDTO): Promise<Attendee> {
    return this.provider.create(attendee) as unknown as Promise<Attendee>;
  }

}