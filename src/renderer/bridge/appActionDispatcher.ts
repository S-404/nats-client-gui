import actions from '#app/actions';

const appActionDispatcher = (
  actionName: keyof typeof actions,
  payload: object | string
) => window.ipcRenderer.invoke(actionName, payload);

export default appActionDispatcher;
