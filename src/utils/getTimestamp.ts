import { DateTime } from 'luxon';

export const getTimestamp = (timeField: string, units: number) =>
  parseInt(
    DateTime.local()
      .plus({ [timeField]: units })
      .toSeconds()
      .toFixed(0)
  );
