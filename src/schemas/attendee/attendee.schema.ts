import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Attendee {
  _id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  documentNumber: string;

  @Prop({ required: true })
  documentType: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  emergencyContactName: string;

  @Prop({ required: true })
  emergencyContactPhone: string;
}

export type AttendeeTextDocument = Attendee & mongoose.Document;

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);
