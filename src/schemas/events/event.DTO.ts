import { ApiProperty } from '@nestjs/swagger';


export class EventDTO {

  @ApiProperty({ type: Date })
  date: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  time: string;

  @ApiProperty({ type: String })
  capacity: number;

  @ApiProperty({ type: String })
  user: string;

  @ApiProperty({ type: String })
  churhId: string;
}
