import { ServersTab } from './components/serversTab';
import { SubjectsTab } from './components/subjectsTab';
import { MessagesTab } from './components/messagesTab';
import { PublishTab } from './components/publishTab';
import { LoggerTab } from './components/loggerTab';
import './styles/main.css';
import './app.scss';


function App() {
  return (
    <div className="app">
      <div className="header">
        <ServersTab/>
      </div>
      <div className="body">
        <div className="body__left-container">
          <SubjectsTab/>
        </div>
        <div className="body__right-container">
          <MessagesTab/>
          <PublishTab/>
        </div>
      </div>
      <div className="footer">
        <LoggerTab/>
      </div>

    </div>
  );
}

export default App;
