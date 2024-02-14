import natsActions from './natsClient';
import loggerActions from './logMessages';
import menuBarActions from './menuBar';

const actions = {
  ...natsActions,
  ...loggerActions,
  ...menuBarActions,
};
export default actions;
