import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Booking } from './Boooking.type';

@Schema({ timestamps: true })
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

  @Prop()
  isBookingAvailable: boolean;

  @Prop({ required: true, default: "Pendiente" })
  status: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Church' })
  churchId: string;

  @Prop()
  Bookings: Booking [] 
}

export type EventDocument = Events & mongoose.Document;

export const EventSchema = SchemaFactory.createForClass(Events);
