import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventSchema } from 'src/schemas/events/event.shema';
import { EventController } from 'src/controllers/event/event.controller';
import { EventBusiness } from 'src/business/event/event.bl';
import { EventProvider } from 'src/providers/events/event.provider';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventBusiness, EventProvider],
})
export class EventModule {}
