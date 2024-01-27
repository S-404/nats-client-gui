import * as constants from './constants.ts';

const events = [];

for (const eventName of Object.values(constants)) {
  events.push(eventName);
}

export default events;
