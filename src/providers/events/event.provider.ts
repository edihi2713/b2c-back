import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDTO, CreateEventDTO } from 'src/schemas/events/event.DTO';
import { Events, EventDocument } from 'src/schemas/events/event.shema';
import { Booking } from 'src/schemas/events/Boooking.type';
import { nanoid } from 'nanoid';

@Injectable()
export class EventProvider {
  constructor(
    @InjectModel(Events.name) private eventModel: Model<EventDocument>,
  ) {}

  async newEvent(event: EventDTO) {
    console.log(event);
    
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

  async addBooking(newBooking: CreateEventDTO, eventId: string) {
  
    const isExisting = await this.hasExistingBooking(newBooking.attendeeDocument, eventId)

    if(!isExisting){

      const mappedBooking = {...newBooking, status: "Pendiente", id: nanoid() };
      
      const newBookingUpdate = {
        $push: { "Bookings": mappedBooking}
      };

      return  this.eventModel.findOneAndUpdate({
        _id: eventId
      }, newBookingUpdate, {
        new: true
      });
    }

    return  this.eventModel.find({
      _id: eventId 
    })

  }

  async hasExistingBooking(documentNumber:string, eventId:string ) : Promise<boolean>{

    const existingBooking = await this.eventModel.findOne({
      _id: eventId,
      "Bookings.attendeeDocument": documentNumber
    });
    
    if(existingBooking){
      return true;
    }

    return false;
  }

  async updateBooking(bookingId:string, newStatus:string) : Promise<boolean>{
        
    const existingBooking = await this.eventModel.findOne({
      "Bookings.id": bookingId
    });

    if(existingBooking){
      try {
          await this.eventModel.updateOne(
          {
            "Bookings.id": bookingId
          },
          {
            $set: {
              "Bookings.$.status": newStatus
            }
          }
        );
        return true;

      } catch (error) {
        console.log(error);
        return false;
      }
    }

    return false;
  }
}
