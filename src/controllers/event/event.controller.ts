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
import { EventDTO } from 'src/schemas/events/event.DTO';


@ApiTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('event')
export class EventController {
    constructor(private readonly eventBL: EventBusiness) {}

  @Post()
  async newEvent(@Body() event: EventDTO, @Request() req): Promise<Events> {
     
    let mappedEvent = {...event, user: req.user._id };

    return await this.eventBL.createEvent(mappedEvent);
  }

  @Get()
  async getAll(): Promise< Events [] > {
    return  await this.eventBL.getAll();
  }

  @Get("eventsByChurch/:churchId")
  async getEventByChurch( @Param('churchId') churchId: string): Promise< Events [] > {
    console.log(churchId);
    
    return await this.eventBL.getByChurchId(churchId);
  }
}