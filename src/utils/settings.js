import {axiosGet} from '../axios';

const getBeautifullTimeFormate = (hour, minute) => {
  if (hour < 12) {
    return `${hour < 10 ? '0' + hour : hour}:${
      minute < 10 ? '0' + minute : minute
    } AM`;
  } else if (hour == 12) {
    return `12:${minute == 0 ? '01' : minute < 10 ? '0' + minute : minute} PM`;
  } else {
    hour = hour - 12;
    return `${hour < 10 ? '0' + hour : hour}:${
      minute < 10 ? '0' + minute : minute
    } PM`;
  }
};

const elabSettings = async (data, setsettings) => {
  //   console.log(data);
  let ot = data?.timings?.openingTime; // opening time
  let ct = data?.timings?.closingTime; // closing tion
  let offHours = data?.timings?.offHours; // offhour array [{6},{8},{7}]
  let curTime = new Date(); // cur time
  let hour = curTime.getHours(); /// cur hour

  let minute = curTime.getMinutes(); // cur minute
  let currOn = true; // currently store is on
  let offMessage = null; // message if store is off

  let onMessage = null; // message if store is on
  if (hour < ot?.hour || (hour == ot?.hour && minute < ot?.minutes)) {
    // store is not opened yet
    console.log('store is not opened yet');
    currOn = false;
    offMessage =
      'Our delivery services will be open today at ' +
      getBeautifullTimeFormate(ot?.hour, ot.minutes);
  } else if (hour > ct?.hour || (hour == ct?.hour && minute > ct?.minutes)) {
    // store is closed for today
    currOn = false;
    offMessage =
      'Our delivery services have been close taday, will be resume next day at ' +
      getBeautifullTimeFormate(ot?.hour, ot.minutes);
  } else {
    // time is between openinig and closing time
    offHours = offHours.map(oh => oh.hour);
    console.log(offHours, hour);
    offHours.sort((a, b) => {
      return a - b;
    });
    let upcomingOff = false;
    for (let i in offHours) {
      let offHour = offHours[i];
      if (hour == offHour) {
        // currently an offhour is running
        console.log('currently an offhour is running');
        let nextOpeningHour = hour + 1;
        while (offHours.includes(nextOpeningHour)) {
          nextOpeningHour++;
        }
        currOn = false;
        offMessage =
          'Our Delivery services are paused, will be resume at ' +
          getBeautifullTimeFormate(nextOpeningHour, 0);

        break;
      }
      if (hour < offHour) {
        // currently on not in off hour but off hour is comming
        let nextOpeningHour = offHour + 1;
        while (offHours.includes(nextOpeningHour)) {
          nextOpeningHour++;
        }

        upcomingOff = true;
        currOn = true;
        onMessage =
          offHour - hour <= 1
            ? 'Our delivery is going to close at ' +
              getBeautifullTimeFormate(offHour, 0) +
              ', and will resume at ' +
              getBeautifullTimeFormate(nextOpeningHour, 0)
            : null;

        break;
      }
    }

    if (currOn && !upcomingOff) {
      // store is open currently and no offhours is comming now store is going to close directly
      // will open next day
      currOn = true;
      onMessage =
        ct?.hour - hour <= 1
          ? 'Our delivery is going to close today at ' +
            getBeautifullTimeFormate(ct?.hour, ct.minutes) +
            ', and will resume next day at ' +
            getBeautifullTimeFormate(ot?.hour, ot.minutes)
          : null;
    }
  }

  setsettings(pre => {
    pre = {...pre, currOn, onMessage, offMessage, settings: data};
    console.log(pre, 'gghhjghj');
    return pre;
  });

  console.log(new Date() - curTime, 'timihgjhjh');
};

export const getSettings = async setsettings => {
  axiosGet(
    'holiday',
    holidays => {
      //   console.log(holidays);
      holidays = holidays.map(hl => hl.date);
      let curTime = new Date();
      let date = `${curTime?.getFullYear()}-${
        1 + curTime?.getMonth()
      }-${curTime?.getDate()}`;
      let todayOn = true;
      let todayOffMessage = null;
      for (let i in holidays) {
        let hl = holidays[i];
        if (hl.includes(date)) {
          todayOn = false;
          todayOffMessage = 'Our delivery services are closed for today.';
          break;
        }
      }
      setsettings(pre => {
        pre = {...pre, todayOn, holidays};
        console.log(pre, 'holidays');
        return pre;
      });
    },
    res => {
      console.log(res);
    },
    null,
    null,
  );
  axiosGet(
    'settings',
    data => {
      elabSettings(data, setsettings);
    },
    res => console.log(res),
    null,
    null,
  );
};
