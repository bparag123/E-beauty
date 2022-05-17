import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDTO } from './dto/createBookingDto';

interface dateInput {
  datetime: Date;
}

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}
  @Post()
  bookTreatment(@Body() bookingDto: CreateBookingDTO) {
    return this.bookingService.bookSlot(bookingDto);
  }

  @Get()
  availableSlots(@Body() date: dateInput) {
    return this.bookingService.availableSlots(date.datetime);
  }
}
