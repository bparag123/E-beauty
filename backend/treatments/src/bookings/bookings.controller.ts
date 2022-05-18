import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDTO } from './dto/createBookingDto';

interface dateInput {
  datetime: Date;
  duration: number;
}

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}
  @Post()
  bookTreatment(@Body() bookingDto: CreateBookingDTO) {
    return this.bookingService.bookSlot(bookingDto);
  }

  @Post('check-availability')
  availableSlots(@Body() data: dateInput) {
    return this.bookingService.availableSlots(data.datetime, data.duration);
  }

  @Delete()
  deleteAll() {
    return this.bookingService.deleteAllBookings();
  }

  @Get()
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }
}
