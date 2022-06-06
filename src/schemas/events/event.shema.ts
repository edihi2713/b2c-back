import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


@Schema()
export class Events {
  _id: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true, default: "Pendiente" })
  status: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: string;
}

export type EventDocument = Events & mongoose.Document;

export const EventSchema = SchemaFactory.createForClass(Events);