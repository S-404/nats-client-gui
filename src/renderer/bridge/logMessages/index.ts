import { LOGGER_ADD} from '#app/events/constants.ts';
import { addLogMessage } from './addLogMessage.ts';


const loggerActions = {
  [LOGGER_ADD]: addLogMessage,
};

export default loggerActions;
