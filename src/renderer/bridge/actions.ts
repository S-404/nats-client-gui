import natsActions from './natsClient';
import loggerActions from './logMessages';

const actions = {
  ...natsActions,
  ...loggerActions
};
export default actions;
