import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttendeeDTO } from 'src/schemas/attendee/attendee.DTO';
import { Attendee, AttendeeTextDocument } from 'src/schemas/Attendee/attendee.schema';

@Injectable()
export class AttendeeProvider {
  constructor(@InjectModel(Attendee.name) private attendeeModel: Model<AttendeeTextDocument>) {}

  async getAllAttendee() {
    return this.attendeeModel.find()
  }

  async getAllAttendeeByDocumentNumber( documentNumber : string) {
    return this.attendeeModel.findOne({
        documentNumber: documentNumber
      });
  }

  async create( attendee : AttendeeDTO) {
    return this.attendeeModel.create(attendee);
  }

}