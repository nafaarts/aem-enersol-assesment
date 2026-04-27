import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('app_cache');
  }

  async put(doc: any) {
    return this.db.put(doc);
  }

  async get(id: string) {
    return this.db.get(id);
  }

  async remove(doc: any) {
    return this.db.remove(doc);
  }

  async getAll() {
    return this.db.allDocs({ include_docs: true });
  }
}
