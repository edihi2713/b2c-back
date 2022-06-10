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
import { AttendeeBusiness } from 'src/business/Attendee/attendee.bl';
import { AttendeeProvider } from 'src/providers/attendee/attendee.provider';
import { AttendeeDTO } from 'src/schemas/attendee/attendee.DTO';
import { Attendee } from 'src/schemas/attendee/attendee.schema';



@ApiTags('Attendees')
@Controller('attendee')
export class AttendeeController {
    constructor(private readonly attendeeBl: AttendeeBusiness) {}

  @Get()
  async getAll(): Promise< Attendee [] > {
    return  await this.attendeeBl.getAllAttendee();
  }

  @Post()
  async createAttendee(@Body() attendee: AttendeeDTO): Promise< Attendee  > {
    return  await this.attendeeBl.create(attendee);
  }

  @Get(":documentNumber")
  async getEventByChurch( @Param('documentNumber') documentNumber: string): Promise< Attendee [] > {
    console.log(documentNumber);
    
    return await this.attendeeBl.getAllAttendeeByDocumentNumber(documentNumber);
  }
}