import eventbus from './eventbus.ts';
import { LOGGER_ADD } from '#app/events/constants.ts';
import { timeString } from '#app/helpers/dateFormat.ts';

export default function (
  message: string,
  type: 'info' | 'warn' | 'error' | 'success' = 'info'
) {
  eventbus.emit(LOGGER_ADD, {
    time: timeString(),
    message,
    type,
  });
}
