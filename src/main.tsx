import ReactDOM from 'react-dom/client';
import App from './ui/App.tsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
