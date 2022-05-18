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
    //Here First I need to check the availability of the booking slots
    // return `${temp} to ${temp2}`;
    return await this.bookingModel.create({
      treatmentId,
      duration,
      datetime: d,
    });
  }

  async availableSlots(date, duration) {
    //This is a temporary Policy
    //Todo : Store the working Policy into the DB
    const policy = {
      startTime: '16:00',
      endTime: '21:00',
    };
    const d = new Date(date);
    //Finding the Booking of the given Date
    const treatments = await this.bookingModel
      .find({
        datetime: {
          $gte: moment(d),
          $lt: moment(d).add(1, 'd'),
        },
      })
      .sort({ datetime: 1 });

    const slots = [];
    let startTime;
    let endTime;

    for (let ele = 1; ele <= treatments.length; ele++) {
      //This will be Starting Time of Current Treatment
      startTime = moment(treatments[ele - 1].datetime);

      //This will be Ending Time of Current Treatment
      //This can also be considered as start time of next treatment
      endTime = moment(treatments[ele - 1].datetime).add(
        treatments[ele - 1].duration,
        'h',
      );
      //For the first time we need to check the slot from starting of working day
      if (ele === 1) {
        const dayStart = moment(date + ' ' + policy.startTime);

        /**If the day starting time and the duration to complete the given task is 
        less then starting time of next treatment then i need to allot the slot 
        */
        if (moment(dayStart).add(duration, 'h').isSameOrBefore(startTime)) {
          slots.push(dayStart.format('hh:mm a'));
        }
      }
      /**For the Last Booked Treatment if the request Duration is exceeding the working hour
      then that slot will not be available to be book
      */
      if (ele === treatments.length) {
        const dayEnd = moment(date + ' ' + policy.endTime);
        if (moment(endTime).add(duration, 'h').isSameOrBefore(dayEnd)) {
          slots.push(endTime.format('hh:mm a'));
        }
      } else {
        /**
         * If Starting time of the next treatment is not in between starting time and ending time
         * of the selected slot then it will be available to be book
         */
        if (
          !moment(treatments[ele].datetime).isBetween(
            endTime,
            moment(endTime).add(duration, 'h'),
          )
        ) {
          slots.push(endTime.format('hh:mm a'));
        }
      }
    }
    return slots;
  }
}
