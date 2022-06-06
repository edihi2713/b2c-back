import {
    Body,
    Controller,
    Post,
    Get,
    UseGuards
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { EventBusiness } from 'src/business/event/event.bl';
import { Events } from 'src/schemas/events/event.shema';
import { EventDTO } from 'src/schemas/events/event.DTO';


@ApiTags('Event')
@Controller('event')
export class EventController {
    constructor(private readonly eventBL: EventBusiness) {}

  @Post()
  async newEvent(@Body() event: EventDTO): Promise<Events> {
    return await this.eventBL.createEvent(event);
  }

  @Get()
  async getAll(): Promise< Events [] > {
    return  await this.eventBL.getAll();
  }

}