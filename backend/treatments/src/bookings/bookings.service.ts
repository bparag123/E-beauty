import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingSchema } from 'src/schemas/booking.schema';
import * as moment from 'moment';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<BookingSchema>,
  ) {}

  async bookSlot(data) {
    const { treatmentId, duration, datetime } = data;
    const d = new Date(datetime);
    const temp = moment(d).format('hh:mm');
    const temp2 = moment(d).add(duration, 'h').format('hh:mm');
    console.log(temp, temp2);
    //Here First I need to check the availability of the booking slots
    return `${temp} to ${temp2}`;
    // return await this.bookingModel.create({
    //   treatmentId,
    //   duration,
    //   datetime: d,
    // });
  }

  async availableSlots(date) {
    const d = new Date(date);
    const treatments = await this.bookingModel.find({
      datetime: {
        $gte: moment(d),
        $lt: moment(d).add(1, 'd'),
      },
    });
    const slots = [];
    let startTime;
    let endTime;
    treatments.map((ele) => {
      startTime = moment(ele.datetime).format('hh:mm a');
      endTime = moment(ele.datetime).add(ele.duration, 'h').format('hh:mm a');
      //   console.log(moment(new Date(ele.datetime)));
      console.log(startTime, ' to ', endTime);
    });
    return treatments;
  }
}
