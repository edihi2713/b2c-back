import {
    Body,
    Controller,
    Post,
    Get,
    UseGuards,
    Request,
    Param
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { EventBusiness } from 'src/business/event/event.bl';
import { Events } from 'src/schemas/events/event.shema';
import { EventDTO, CreateEventDTO } from 'src/schemas/events/event.DTO';


@ApiTags('Event')
@ApiBearerAuth()
@Controller('event')
export class EventController {
    constructor(private readonly eventBL: EventBusiness) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async newEvent(@Body() event: EventDTO, @Request() req): Promise<Events> {
      
    let mappedEvent = {...event, user: req.user._id, isBookingAvailable: false };

    return await this.eventBL.createEvent(mappedEvent);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise< Events [] > {
    return  await this.eventBL.getAll();
  }

  @Get("eventsByChurch/:churchId")
  async getEventByChurch( @Param('churchId') churchId: string): Promise< Events [] > {
    console.log(churchId);
    
    return await this.eventBL.getByChurchId(churchId);
  }

  @Post("addBooking/:eventId")
  async addBooking( @Param('eventId') eventId: string, @Body() newBooking: CreateEventDTO): Promise< Events> {
  
    return await this.eventBL.addBooking(newBooking, eventId);
  }

  @Get("updateBooking/:bookingId/:newStatus")
  async updateBooking( @Param('bookingId') bookingId: string, @Param('newStatus') newStatus: string ): Promise< boolean> {
    return await this.eventBL.updateBooking(bookingId, newStatus);
  }

}