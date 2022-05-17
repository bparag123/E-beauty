import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateBookingDTO {
  @IsString()
  treatmentId: string;

  @IsNumber()
  duration: number;

  @IsDate()
  datetime: Date;
}
