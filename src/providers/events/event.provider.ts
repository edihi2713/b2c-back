import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDTO } from 'src/schemas/events/event.DTO';
import { Events, EventDocument } from 'src/schemas/events/event.shema';

@Injectable()
export class EventProvider {
  constructor(
    @InjectModel(Events.name) private eventModel: Model<EventDocument>,
  ) {}

  async newEvent(event: EventDTO) {

    return this.eventModel.create(event);
  }

  async getAll() {
    return this.eventModel.find().populate('user').populate("churchId");
  }

  async getByChurchId(churchId: string) {
    return this.eventModel.find({
      churchId: churchId
    }).populate('user').populate("churchId");
  }

}
