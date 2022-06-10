import { Module } from '@nestjs/common';
import { MongoProviderModule } from './config/database/mongo/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';
import { ChurchModule } from './modules/church/church.module';
import { EventModule } from './modules/event/event.module';
import { AttendeeModule } from './modules/attendee/attendee.module';

@Module({
  imports: [
    MongoProviderModule,
    AuthModule,
    UserModule,
    CommonModule,
    ChurchModule,
    EventModule,
    AttendeeModule
  ],
})
export class AppModule {}
