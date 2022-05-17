import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Treatment } from './treatment.schema';

export type BookingSchema = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: Date })
  datetime: Date;

  @Prop()
  duration: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Treatment })
  treatmentId: ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
