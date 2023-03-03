import { DateTime } from 'luxon';

export const getTimestamp = (timeField: string, units: number) =>
  DateTime.local()
    .plus({ [timeField]: units })
    .toMillis();
