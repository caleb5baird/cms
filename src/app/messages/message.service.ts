import { Message } from './message.model';
import { Injectable } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessagesId = 0;

  constructor() {
    this.messages = MOCKMESSAGES;
    this.maxMessagesId = this.getMaxId();
  }

  getMessages(): Message[] { return this.messages.slice() }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  getMaxId(): number {
    let ids = this.messages.map(document => parseInt(document.id))
    return Math.max(...ids);
  }

  addMessage(message: Message): void {
    if (message) {
      ++this.maxMessagesId;
      message.id = this.maxMessagesId.toString();
      this.messages.push(message);
      this.messageListChangedEvent.next(this.messages.slice());
    }
  }
}
