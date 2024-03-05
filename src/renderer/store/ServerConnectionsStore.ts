import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export type ServerConnectionType = {
  id: string;
  host: string;
  port?: string;
  token?: string;
  created: string;
}

class ServerConnectionsStore {
  currentConnection: ServerConnectionType;
  connections: ServerConnectionType[] = [];

  constructor() {
    this.currentConnection = {
      id: uuid(),
      host: '',
      port: '',
      token: '',
      created: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    makeAutoObservable(this);
  }

  setCurrentConnection(connection: ServerConnectionType) {
    this.currentConnection = { ...connection };
  }

  setConnections(connections: ServerConnectionType[]) {
    this.connections = [...connections];
  }

  addConnection(connection: ServerConnectionType) {
    const targetIndex = this.connections.findIndex(item => item.id === connection.id);
    if (targetIndex !== -1) {
      this.connections[targetIndex] = { ...connection };
    } else {
      this.connections.push(connection);
    }
  }

  removeConnection(id: string) {
    console.log('targetdel', this.connections.filter(item => item.id === id))
    this.connections = this.connections.filter(item => item.id !== id);
  }
}


export default new ServerConnectionsStore();
