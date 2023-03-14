import moment from 'moment';

export const getTimestamp = (
  timeField: moment.unitOfTime.DurationConstructor,
  units: number
) => moment().subtract(units, timeField).unix();
