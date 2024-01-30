import electronStoreActions from './electronStore';
import natsActions from './nats';

const actions = {
  ...electronStoreActions,
  ...natsActions,
};

export default actions;
