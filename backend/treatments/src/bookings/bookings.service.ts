/* eslint-disable @typescript-eslint/no-unused-vars */
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

  async deleteAllBookings() {
    return await this.bookingModel.deleteMany();
  }

  async getAllBookings() {
    return await this.bookingModel.find();
  }
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
    console.log(date);
    console.log(duration);
    //This is a temporary Policy
    //Todo : Store the working Policy into the DB
    const policy = {
      startTime: '16:00',
      endTime: '21:00',
    };
    const d = new Date(date);
    console.log(d);
    //Finding the Booking of the given Date
    const treatments = await this.bookingModel
      .find({
        datetime: {
          $gte: moment(d),
          $lt: moment(d).add(1, 'd'),
        },
      })
      .sort({ datetime: 1 });
    const slots = {
      available: [],
      occupied: [],
    };
    const dayStart = moment(date + ' ' + policy.startTime);
    const dayEnd = moment(date + ' ' + policy.endTime);

    //Finding The Occupied Slots
    if (treatments.length === 0) {
      slots.available.push({
        start: moment(dayStart).format(),
        end: moment(dayEnd).format(),
      });
    } else {
      for (let ele = 0; ele < treatments.length; ele++) {
        const startTime = moment(treatments[ele].datetime);
        const endTime = moment(startTime).add(treatments[ele].duration, 'h');
        slots.occupied.push({
          start: moment(startTime).format(),
          end: moment(endTime).format(),
        });
      }
    }

    //This is a counter type variable to check the available time difference between treatments
    let lastFreeTime = moment(dayStart);
    slots.occupied.forEach((ele) => {
      if (moment(ele.start).isSame(moment(dayStart))) {
        lastFreeTime = moment(ele.end);
      } else {
        if (moment(lastFreeTime).isSame(moment(ele.start))) {
          lastFreeTime = moment(ele.end);
        } else if (moment(ele.start).isAfter(moment(lastFreeTime))) {
          slots.available.push({
            start: moment(lastFreeTime).format(),
            end: moment(ele.start).format(),
          });
        }
      }
    });
    if (slots.occupied.length > 0) {
      const lastFinished = moment(
        slots.occupied[slots.occupied.length - 1].end,
      );
      if (moment(lastFinished).isBefore(moment(dayEnd))) {
        slots.available.push({
          start: moment(lastFinished).format(),
          end: moment(dayEnd).format(),
        });
      }
    }

    return slots;
  }
}
