import { IsNumber, IsString } from 'class-validator';
export class CreateTreatmentDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  charge: number;
}
