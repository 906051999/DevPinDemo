import { openDB } from 'idb';

const DB_NAME = 'node-db';
const DB_VERSION = 1;

export const db = {
  async init() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('nodes', { keyPath: 'id' });
      },
    });
  },

  async getAllNodes() {
    const db = await this.init();
    return db.getAll('nodes');
  },

  async saveNode(node) {
    const db = await this.init();
    return db.put('nodes', node);
  },

  async updateNode(node) {
    const db = await this.init();
    node.updatedAt = new Date().toISOString();
    return db.put('nodes', node);
  },

  async deleteNode(nodeId: string) {
    const db = await this.init();
    return db.delete('nodes', nodeId);
  }
}; 