import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentSchema } from 'src/schemas/treatment.schema';
import { BookingSchema } from 'src/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Treatment', schema: TreatmentSchema }]),
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
