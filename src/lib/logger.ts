import eventbus from './eventbus.ts';
import { LOGGER_ADD } from '#app/events/constants.ts';
import { timeString } from '#app/helpers/dateFormat.ts';

export default function (value: string) {
  eventbus.emit(LOGGER_ADD, `${timeString()}: ${value}`);
}
