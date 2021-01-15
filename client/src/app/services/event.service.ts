import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private dataSource;
  private data;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.dataSource = new BehaviorSubject<any>({});
    this.data = this.dataSource.asObservable();
  }

  emit(type: EventType, data: any) {
    this.dataSource.next({ type, data });
  }

  listen() {
    return this.data;
  }

  finish() {
    this.dataSource.next({});
  }
}

export type EventType = 'LISTEN_STATE_CHANNEL' | 'HOLA';