import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
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
  bookTreatment(@Body() bookingDto: CreateBookingDTO, @Req() req) {
    const data = { ...bookingDto, user: req.user.email };
    return this.bookingService.bookSlot(data);
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
  getAllBookingsOfUser(@Req() req) {
    return this.bookingService.getAllBookings(req.user.email);
  }
}
