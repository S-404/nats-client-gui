import './app.scss';
import { LoggerTab } from './loggerTab';
import { MessagesTab } from './messagesTab';
import { PublishTab } from './publishTab/PublishTab.tsx';
import { ServersTab } from './serversTab';
import { SubjectsTab } from './subjectsTab/SubjectsTab.tsx';

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
