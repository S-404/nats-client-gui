import { WINDOW_ABOUT_OPEN } from '#app/events/constants.ts';
import { openAbout } from '#renderer/bridge/menuBar/openAbout.ts';

const menuBarActions = {
  [WINDOW_ABOUT_OPEN]: openAbout,
};

export default menuBarActions;
