import { SubjectsTab } from '#renderer/components/subjectsTab';
import { MessagesTab } from '#renderer/components/messagesTab';
import { PublishTab } from '#renderer/components/publishTab';
import { ServersTab } from '#renderer/components/serversTab';
import { LoggerTab } from '#renderer/components/loggerTab';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

import 'react-reflex/styles.css';
import './styles/main.css';
import './app.scss';


function App() {
  return (
    <div className="app">
      <div className="header">
        <ServersTab/>
      </div>

      <div className="body">
        <ReflexContainer orientation="vertical">

          <ReflexElement>
            <SubjectsTab/>
          </ReflexElement>

          <ReflexSplitter propagate={true}/>

          <ReflexElement>
            <MessagesTab/>
          </ReflexElement>

          <ReflexSplitter propagate={true}/>

          <ReflexElement>
            <PublishTab/>
          </ReflexElement>

        </ReflexContainer>
      </div>

      <div className="footer">
        <LoggerTab/>
      </div>

    </div>
  );
}

export default App;
