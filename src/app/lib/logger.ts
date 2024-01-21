import eventbus from '../events/eventbus.ts';
import { LOGGER_ADD } from '../events/constants.ts';
import { timeString } from '../helpers/dateFormat.ts';

export default function (value: string) {
  eventbus.emit(LOGGER_ADD, `${timeString()}: ${value}`);
}
