import actions from '#app/actions';

const actionDispatcher = (
  actionName: keyof typeof actions,
  payload: object | string
) => window.ipcRenderer.invoke(actionName, payload);

export default actionDispatcher;
