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

  async getAllBookings(email) {
    return await this.bookingModel.find({ user: email });
  }
  async bookSlot(data) {
    const { treatmentId, duration, datetime, user } = data;
    const d = new Date(datetime);
    return await this.bookingModel.create({
      treatmentId,
      duration,
      datetime: d,
      user,
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
    if (treatments.length > 0) {
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
      /**
       * If the starting time of occupied treatment is same as starting time of day
       * then we need to update the free time with ending time of treatment
       */
      //First If can only be true in for first treatment
      if (moment(ele.start).isSame(moment(dayStart))) {
        lastFreeTime = moment(ele.end);
      } else {
        if (moment(lastFreeTime).isSame(moment(ele.start))) {
          lastFreeTime = moment(ele.end);
        } else if (moment(ele.start).isAfter(moment(lastFreeTime))) {
          //Here I'm Finding the duration of available time
          const diff = moment.duration(lastFreeTime.diff(moment(ele.start)));
          console.log('Last Free', moment(lastFreeTime));
          console.log('Current Start', moment(ele.start));
          console.log(Math.abs(diff.asHours()) >= duration);
          const currentDuration = Math.abs(diff.asHours());
          console.log('Current Duration', currentDuration);
          //If the available time is G or E to required time then only i need to procced for allotment
          if (currentDuration >= duration) {
            //This is a reference time counter to allot the slots over the available time
            let lastTimeForSubSlots = moment(lastFreeTime);
            const totalSubSlots = Math.floor(currentDuration / duration);
            console.log('Total Sub SLots', totalSubSlots);
            for (let i = 0; i < totalSubSlots; i++) {
              slots.available.push({
                start: moment(lastTimeForSubSlots).format(),
                end: moment(lastTimeForSubSlots).add(duration, 'h').format(),
              });
              lastTimeForSubSlots = moment(lastTimeForSubSlots).add(
                duration,
                'h',
              );
            }
            /**
             * This is a kind of bussiness Logic that if after assigning the slot
             * if there is time gap then i can provide one different time slot to the user
             * in available time duration
             */
            if (moment(lastTimeForSubSlots).isBefore(moment(ele.start))) {
              slots.available.push({
                start: moment(ele.start).subtract(duration, 'h').format(),
                end: moment(ele.start).format(),
              });
            }
            lastFreeTime = moment(ele.end);
          } else {
            lastFreeTime = moment(ele.end);
          }
        }
      }
    });

    //This is for the allocation after the last booking if the working time remains
    if (slots.occupied.length > 0) {
      const lastFinished = moment(
        slots.occupied[slots.occupied.length - 1].end,
      );
      if (moment(lastFinished).isBefore(moment(dayEnd))) {
        const diff = moment.duration(lastFreeTime.diff(dayEnd));
        const currentDuration = Math.abs(diff.asHours());
        if (currentDuration >= duration) {
          let lastTimeForSubSlots = moment(lastFinished);
          const totalSubSlots = Math.floor(currentDuration / duration);
          for (let i = 0; i < totalSubSlots; i++) {
            slots.available.push({
              start: moment(lastTimeForSubSlots).format(),
              end: moment(lastTimeForSubSlots).add(duration, 'h').format(),
            });
            lastTimeForSubSlots = moment(lastTimeForSubSlots).add(
              duration,
              'h',
            );
          }
          if (moment(lastTimeForSubSlots).isBefore(moment(dayEnd))) {
            slots.available.push({
              start: moment(dayEnd).subtract(duration, 'h').format(),
              end: moment(dayEnd).format(),
            });
          }
        }
      }
    } else {
      const totalTime = Math.abs(
        moment.duration(dayStart.diff(dayEnd)).asHours(),
      );
      const totalSubSlots = Math.floor(totalTime / duration);
      console.log(totalTime, totalSubSlots);
      let lastFinished = moment(dayStart);
      console.log(lastFinished);
      for (let i = 0; i < totalSubSlots; i++) {
        slots.available.push({
          start: moment(lastFinished).format(),
          end: moment(lastFinished).add(duration, 'h').format(),
        });
        lastFinished = moment(lastFinished).add(duration, 'h');
      }
      if (moment(lastFinished).isBefore(moment(dayEnd))) {
        slots.available.push({
          start: moment(dayEnd).subtract(duration, 'h').format(),
          end: moment(dayEnd).format(),
        });
      }
    }

    return slots;
  }
}
