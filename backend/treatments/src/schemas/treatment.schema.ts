import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreatmentDocument = Treatment & Document;

@Schema()
export class Treatment {
  @Prop()
  name: string;

  @Prop()
  time: Date;

  @Prop()
  charge: number;
}

export const TreatmentSchema = SchemaFactory.createForClass(Treatment);
