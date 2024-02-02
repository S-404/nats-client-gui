import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import events from '#app/events/events.ts';
import { actions as rendererActions } from 'src/renderer/bridge';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
);

postMessage({ payload: 'removeLoading' }, '*');

for (const event of events) {
  if (rendererActions[event]) {
    window.ipcRenderer.on(event, (_event, message) => {
      rendererActions[event](message);
    });
  }
}

